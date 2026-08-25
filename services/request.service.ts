import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "@/config/firebase";
import { ChatRequest } from "@/types/request/request.types";
import { createChat } from "./chat.service";

const REQUESTS_COLLECTION = "chat_requests";
const USERS_COLLECTION = "users";
const CHATS_COLLECTION = "chats";
/**
 * -----------------------------
 * Send Chat Request
 * -----------------------------
 */
export const sendChatRequest = async (
  senderId: string,
  receiverId: string
) => {
  if (senderId === receiverId) {
    throw new Error("You can't send request to yourself.");
  }

  // Duplicate check
  const q = query(
    collection(db, REQUESTS_COLLECTION),
    where("senderId", "==", senderId),
    where("receiverId", "==", receiverId)
  );

  const snap = await getDocs(q);

  if (!snap.empty) {
    throw new Error("Request already sent.");
  }

  // Reverse request check
  const reverseQuery = query(
    collection(db, REQUESTS_COLLECTION),
    where("senderId", "==", receiverId),
    where("receiverId", "==", senderId)
  );

  const reverseSnap = await getDocs(reverseQuery);

  if (!reverseSnap.empty) {
    throw new Error(
      "This user has already sent you a request."
    );
  }

  await addDoc(collection(db, REQUESTS_COLLECTION), {
    senderId,
    receiverId,
    status: "pending",
    createdAt: serverTimestamp(),
  });
};

/**
 * -----------------------------
 * Accept Request
 * -----------------------------
 */
export const acceptChatRequest = async (
  requestId: string
) => {

  const requestRef = doc(db, REQUESTS_COLLECTION, requestId);

  const requestSnap = await getDoc(requestRef);

  if (!requestSnap.exists()) {
    throw new Error("Request not found.");
  }

  const request = requestSnap.data();

  // Chat Create
  const chatId = await createChat(
    request.senderId,
    request.receiverId
  );

  await updateDoc(requestRef, {
    status: "accepted",
    acceptedAt: serverTimestamp()
  });


  const check = await getDoc(requestRef);

  console.log(
    "AFTER UPDATE REQUEST:",
    check.data()
  );

  return {
    chatId,
    otherUserId: request.senderId,
  };
};

/**
 * -----------------------------
 * Reject Request
 * -----------------------------
 */
export const rejectChatRequest = async (
  requestId: string
) => {

  await deleteDoc(
    doc(
      db,
      REQUESTS_COLLECTION,
      requestId
    )
  );

};

/**
 * -----------------------------
 * Cancel Request
 * -----------------------------
 */
export const cancelChatRequest = async (
  requestId: string
) => {
  await deleteDoc(
    doc(db, REQUESTS_COLLECTION, requestId)
  );
};

/**
 * -----------------------------
 * Get Pending Requests
 * -----------------------------
 */
export const getPendingRequests = async (
  receiverId: string
): Promise<ChatRequest[]> => {
  const q = query(
    collection(db, REQUESTS_COLLECTION),
    where("receiverId", "==", receiverId),
    where("status", "==", "pending")
  );

  const snap = await getDocs(q);

  return snap.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<ChatRequest, "id">),
  }));
};

/**
 * -----------------------------
 * Listen Pending Requests (sender ka naam/photo enriched)
 * -----------------------------
 */
export interface EnrichedChatRequest extends ChatRequest {
  senderName?: string;
  senderUsername?: string;
  senderPhoto?: string;
}

export function listenPendingRequests(
  uid: string,
  callback: (data: EnrichedChatRequest[]) => void
) {
  const q = query(
    collection(db, REQUESTS_COLLECTION),
    where("receiverId", "==", uid),
    where("status", "==", "pending")
  );

  const unsubscribe = onSnapshot(
    q,
    async (snapshot) => {

      const requests = await Promise.all(
        snapshot.docs.map(async (docSnap) => {

          const data = docSnap.data() as ChatRequest;


          let senderName = "";
          let senderUsername = "";
          let senderPhoto = "";


          try {
            const userSnap = await getDoc(
              doc(
                db,
                USERS_COLLECTION,
                data.senderId
              )
            );


            if (userSnap.exists()) {

              const user = userSnap.data();

              senderName =
                user.displayName || "";

              senderUsername =
                user.username || "";

              senderPhoto =
                user.photoURL || "";
            }


          } catch (error) {

            console.log(
              "User fetch error",
              error
            );

          }


          const request: EnrichedChatRequest = {

            id: docSnap.id,

            senderId: data.senderId,

            receiverId: data.receiverId,

            status: data.status,

            createdAt: data.createdAt,


            senderName,

            senderUsername,

            senderPhoto,

          };


          return request;

        })
      );


      callback(requests);

    },


    (error) => {
      if (error?.code === "permission-denied" || error?.message?.includes("permission-denied")) {
        return;
      }
      console.log(
        "Pending request listener error:",
        error.message
      );
    }
  );


  return unsubscribe;
}

/**
 * -----------------------------
 * Get Request Status
 * -----------------------------
 */

export const getRequestStatus = async (
  currentUserId: string,
  otherUserId: string
) => {
  const sentQuery = query(
    collection(db, REQUESTS_COLLECTION),
    where("senderId", "==", currentUserId),
    where("receiverId", "==", otherUserId)
  );

  const sentSnap = await getDocs(sentQuery);

  if (!sentSnap.empty) {
    return {
      type: "sent",
      requestId: sentSnap.docs[0].id,
      ...(sentSnap.docs[0].data() as any),
    };
  }

  const receivedQuery = query(
    collection(db, REQUESTS_COLLECTION),
    where("senderId", "==", otherUserId),
    where("receiverId", "==", currentUserId)
  );

  const receivedSnap = await getDocs(receivedQuery);

  if (!receivedSnap.empty) {
    return {
      type: "received",
      requestId: receivedSnap.docs[0].id,
      ...(receivedSnap.docs[0].data() as any),
    };
  }

  return null;
};

/**
 * -----------------------------
 * Listen Request Status
 * -----------------------------
 */

export const listenRequestStatus = (
  currentUserId: string,
  otherUserId: string,
  callback: (status: any) => void
) => {
  const q = query(
    collection(db, REQUESTS_COLLECTION),
    where("status", "==", "pending")
  );

  return onSnapshot(q, (snapshot) => {
    const doc = snapshot.docs.find((d) => {
      const data = d.data();

      return (
        (data.senderId === currentUserId &&
          data.receiverId === otherUserId) ||
        (data.senderId === otherUserId &&
          data.receiverId === currentUserId)
      );
    });

    if (!doc) {
      callback(null);
      return;
    }

    callback({
      id: doc.id,
      ...doc.data(),
    });
  }, (error) => {
    if (error?.code === "permission-denied" || error?.message?.includes("permission-denied")) {
      return;
    }
    console.log("Request status listener error:", error.message);
  });
};

/**
 * -----------------------------
 * Get Sent Requests
 * -----------------------------
 */

export const getSentRequests = async (
  senderId: string
): Promise<ChatRequest[]> => {
  const q = query(
    collection(db, REQUESTS_COLLECTION),
    where("senderId", "==", senderId),
    where("status", "==", "pending")
  );

  const snap = await getDocs(q);

  return snap.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<ChatRequest, "id">),
  }));
};