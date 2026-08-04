import {
    useCallback,
    useEffect,
    useState,
} from "react";

import {
    fetchChats,
    fetchRecentUsers,
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

    const [chats, setChats] =
        useState<ChatListItem[]>([]);

    const [recentUsers, setRecentUsers] =
        useState<RecentUser[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [refreshing, setRefreshing] =
        useState(false);

    const load = useCallback(
        async (isRefresh = false) => {

            if (isRefresh)
                setRefreshing(true);
            else
                setLoading(true);

            try {

                const [
                    chatsData,
                    recentData,
                ] = await Promise.all([
                    fetchChats(),
                    fetchRecentUsers(),
                ]);

                setChats(chatsData);

                setRecentUsers(recentData);

            } catch (e) {

                console.log(
                    "Chats Error:",
                    e
                );

            } finally {

                setLoading(false);

                setRefreshing(false);

            }

        },
        []
    );

    useEffect(() => {

        load();

    }, [load]);

    return {

        chats,

        recentUsers,

        loading,

        refreshing,

        refresh: () => load(true),

    };
}