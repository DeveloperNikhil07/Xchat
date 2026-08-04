import {
  createUserWithEmailAndPassword,
  deleteUser,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

import { auth } from "@/config/firebase";
import { createUserDocument } from "./user.service";

// ---------------- Login ----------------

export const login = async (
  email: string,
  password: string
) => {
  return await signInWithEmailAndPassword(
    auth,
    email.trim(),
    password
  );
};

// ---------------- Signup ----------------
export const signup = async (
  name: string,
  email: string,
  password: string,
  phone: string
) => {
  console.log("Signup Service Called");
  let credential = null;

  try {
    credential =
      await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

    const firebaseUser = credential.user;
    console.log("Firebase User:", credential.user.uid);
    await updateProfile(firebaseUser, {
      displayName: name,
    });

    await createUserDocument({
      uid: firebaseUser.uid,

      displayName: name,

      email,

      username: "",

      phone,

      photoURL: "",

      bio: "",

      isOnline: true,

      lastSeen: Date.now(),

      createdAt: Date.now(),

      updatedAt: Date.now(),

      settings: {
        theme: "system",
        notification: true,
      },

      privacy: {
        lastSeen: true,
        profilePhoto: true,
        about: true,
      },
    });

    return credential;
  } catch (error) {
    console.log("Signup Error:", error);

    if (credential?.user) {
      try {
        await deleteUser(credential.user);
      } catch (e) {
        console.log("Rollback failed:", e);
      }
    }

    throw error;
  }
};

// ---------------- Logout ----------------

export const logout = async () => {
  await signOut(auth);
};

// ---------------- Forgot Password ----------------

export const forgotPassword = async (
  email: string
) => {
  await sendPasswordResetEmail(auth, email);
};