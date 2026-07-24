import { fetchChats } from "@/services/chatService";
import { ChatListItem } from "@/types/chat/chatListItem";
import { useCallback, useEffect, useState } from "react";

interface UseChatsResult {
    chats: ChatListItem[];
    loading: boolean;
    refreshing: boolean;
    refresh: () => Promise<void>;
}

export function useChats(): UseChatsResult {
    const [chats, setChats] = useState<ChatListItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const load = useCallback(async (isRefresh = false) => {
        if (isRefresh) setRefreshing(true);
        else setLoading(true);

        try {
            const data = await fetchChats();
            setChats(data);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    useEffect(() => {
        load();
    }, [load]);

    const refresh = useCallback(() => load(true), [load]);

    return { chats, loading, refreshing, refresh };
}