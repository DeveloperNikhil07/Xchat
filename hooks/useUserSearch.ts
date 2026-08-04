import { useCallback, useState } from "react";

import {
    SearchUser,
    searchUsers,
} from "@/services/search.service";

export function useUserSearch() {
    const [users, setUsers] = useState<SearchUser[]>([]);
    const [loading, setLoading] = useState(false);

    const search = useCallback(async (text: string) => {
        const keyword = text.trim().toLowerCase();

        if (!keyword) {
            setUsers([]);
            return;
        }

        try {
            setLoading(true);

            const result = await searchUsers(keyword);

            setUsers(result);
        } catch (error) {
            console.log("Search Error:", error);
            setUsers([]);
        } finally {
            setLoading(false);
        }
    }, []);

    const clear = () => {
        setUsers([]);
    };

    return {
        users,
        loading,
        search,
        clear,
    };
}