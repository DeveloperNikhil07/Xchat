import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "@/config/firebase";
import { ChatRequest } from "@/types/request/request.types";

const REQUESTS_COLLECTION = "chat_requests";

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
  await updateDoc(
    doc(db, REQUESTS_COLLECTION, requestId),
    {
      status: "accepted",
    }
  );
};

/**
 * -----------------------------
 * Reject Request
 * -----------------------------
 */
export const rejectChatRequest = async (
  requestId: string
) => {
  await updateDoc(
    doc(db, REQUESTS_COLLECTION, requestId),
    {
      status: "rejected",
    }
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
 * Listen Pending Requests
 * -----------------------------
 */
export const listenPendingRequests = (
  receiverId: string,
  callback: (requests: ChatRequest[]) => void
) => {
  const q = query(
    collection(db, REQUESTS_COLLECTION),
    where("receiverId", "==", receiverId),
    where("status", "==", "pending")
  );

  return onSnapshot(q, (snapshot) => {
    const requests = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<ChatRequest, "id">),
    }));

    callback(requests);
  });
};

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