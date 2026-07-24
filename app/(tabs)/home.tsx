import ChatFilters from "@/components/home/ChatFilters";
import ChatList from "@/components/home/ChatList";
import ChatListSkeleton from "@/components/home/ChatListSkeleton";
import FloatingActionButton from "@/components/home/FloatingActionButton";
import HomeHeader from "@/components/home/HomeHeader";
import RecentUsers from "@/components/home/RecentUsers";
import RecentUsersSkeleton from "@/components/home/RecentUsersSkeleton";
import ScreenContainer from "@/components/layout/ScreenContainer";
import SearchBar from "@/components/ui/SearchBar";
import { useChats } from "@/hooks/useChats";
import { useMemo, useState } from "react";
import { View } from "react-native";

const filters = [
    { id: "all", label: "All" },
    { id: "unread", label: "Unread", count: 8 },
    { id: "groups", label: "Groups" },
    { id: "archived", label: "Archived" },
];

export default function Home() {
    const [search, setSearch] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("all");

    const { chats, loading, refreshing, refresh } = useChats();

    // Search + filter dono client-side. FIREBASE INTEGRATION: agar list bahut badi ho
    // jaye to name-search ke liye Firestore me alag se "nameLower" field indexed rakh
    // ke query karna, lekin chhoti/medium list ke liye ye tarika fast aur simple hai.
    const filteredChats = useMemo(() => {
        return chats.filter((chat) => {
            const matchSearch = chat.name.toLowerCase().includes(search.toLowerCase());
            if (!matchSearch) return false;

            if (selectedFilter === "unread") return chat.unread > 0;
            if (selectedFilter === "groups") return chat.type === "group";
            if (selectedFilter === "archived") return chat.archived;

            return true;
        });
    }, [chats, search, selectedFilter]);

    return (
        <ScreenContainer>
            {/* Ye sab fixed rahenge, scroll nahi honge */}
            <HomeHeader userName="John Doe"/>

            <SearchBar value={search} onChangeText={setSearch} />

            {loading ? <RecentUsersSkeleton /> : <RecentUsers />}

            <View>
                <ChatFilters
                    filters={filters}
                    selected={selectedFilter}
                    onChange={setSelectedFilter}
                />
            </View>

            {/* Sirf ye area scroll karega */}
            <View style={{ flex: 1 }}>
                {loading ? (
                    <ChatListSkeleton />
                ) : (
                    <ChatList
                        chats={filteredChats}
                        refreshing={refreshing}
                        onRefresh={refresh}
                    />
                )}
            </View>

            <FloatingActionButton
                onPress={() => {
                    console.log("New Chat");
                }}
            />
        </ScreenContainer>
    );
}