import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  fetchChats,
  fetchRecentUsers,
  listenChats,
  listenRecentUsers,
} from "@/services/chat.service";

import { ChatListItem } from "@/types/chat/chatListItem";
import { RecentUser } from "@/types/chat/recentUser.types";

interface UseChatsResult {
  chats: ChatListItem[];
  recentUsers: RecentUser[];
  loading: boolean;
  refreshing: boolean;
  refresh: () => Promise<void>;
}

export function useChats(): UseChatsResult {
  const [chats, setChats] = useState<ChatListItem[]>([]);
  const [recentUsers, setRecentUsers] = useState<RecentUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      const [chatData, recentData] = await Promise.all([
        fetchChats(),
        fetchRecentUsers(),
      ]);

      setChats(chatData);
      setRecentUsers(recentData);

    } catch (e) {
      console.log("Chats Error:", e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    load();

    const unsubscribeChats = listenChats((data) => {
      setChats(data);
    });

    const unsubscribeRecent = listenRecentUsers((users) => {
      setRecentUsers(users);
    });

    return () => {
      unsubscribeChats();
      unsubscribeRecent();
    };
  }, [load]);

  return {
    chats,
    recentUsers,
    loading,
    refreshing,
    refresh: () => load(true),
  };
}

