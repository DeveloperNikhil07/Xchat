// import ChatList from "@/components/home/ChatList";
import ChatList from "@/components/home/ChatList";
import FloatingActionButton from "@/components/home/FloatingActionButton";
import HomeHeader from "@/components/home/HomeHeader";
import RecentUsers from "@/components/home/RecentUsers";
import ScreenContainer from "@/components/layout/ScreenContainer";
import SearchBar from "@/components/ui/SearchBar";
import { useState } from "react";

export default function Home() {
    const [search, setSearch] = useState("");

    return (
        <ScreenContainer >
            {/* Header */}
            <HomeHeader
                userName="John Doe"
                onSearch={() => { }}
                onMenu={() => { }}
            />

            {/* Search */}
            <SearchBar
                value={search}
                onChangeText={setSearch}
            />

            {/* Recent Users */}
            <RecentUsers />

            {/* All Chats */}
            <ChatList />

            <FloatingActionButton
                onPress={() => {
                    console.log("New Chat");
                }}
            />
        </ScreenContainer>
    );
}