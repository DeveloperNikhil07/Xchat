import { Timestamp } from "firebase/firestore";

export type ChatRequestStatus =
  | "pending"
  | "accepted"
  | "rejected"
  | "cancelled";

export interface ChatRequest {
  id: string;

  senderId: string;

  receiverId: string;

  status: ChatRequestStatus;

  createdAt: Timestamp;
}