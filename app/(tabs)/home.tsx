import ChatFilters from "@/components/home/ChatFilters";
import ChatList from "@/components/home/ChatList";
import ChatListSkeleton from "@/components/home/ChatListSkeleton";
import FloatingActionButton from "@/components/home/FloatingActionButton";
import HomeHeader from "@/components/home/HomeHeader";
import RecentUsers from "@/components/home/RecentUsers";
import RecentUsersSkeleton from "@/components/home/RecentUsersSkeleton";
import ScreenContainer from "@/components/layout/ScreenContainer";
import SearchBar from "@/components/ui/SearchBar";
import { useEffect, useState } from "react";
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
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);

    // Pehli baar screen open hote hi data load karna
    useEffect(() => {
        const loadInitialData = async () => {
            // TODO:
            // Firebase se chats/recent users fetch hongi

            await new Promise(resolve => setTimeout(resolve, 1500));

            setLoading(false);
        };

        loadInitialData();
    }, []);

    const onRefresh = async () => {
        setRefreshing(true);
        setLoading(true);
        // TODO:
        // Firebase se chats dubara fetch hongi

        await new Promise(resolve => setTimeout(resolve, 1500));

        setRefreshing(false);
        setLoading(false);
    };

    return (
        <ScreenContainer>
            {/* Ye sab fixed rahenge, scroll nahi honge */}
            <HomeHeader
                userName="John Doe"
                onSearch={() => { }}
                onMenu={() => { }}
            />

            <SearchBar
                value={search}
                onChangeText={setSearch}
            />

            {loading ? <RecentUsersSkeleton /> : <RecentUsers />}

            <View>
                <ChatFilters
                    filters={filters}
                    selected={selectedFilter}
                    onChange={setSelectedFilter}
                />
            </View>

            {/* Sirf ye area scroll karega, apna original design ke saath */}
            <View style={{ flex: 1 }}>
                {loading ? (
                    <ChatListSkeleton />
                ) : (
                    <ChatList
                        refreshing={refreshing}
                        onRefresh={onRefresh}
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