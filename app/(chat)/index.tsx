import { useRouter } from "expo-router";

import ChatList from "@/components/home/ChatList";
import ScreenContainer from "@/components/layout/ScreenContainer";
import SearchBar from "@/components/ui/SearchBar";

import Header from "@/components/common/Header";
import { useAuth } from "@/hooks/useAuth";
import { useChats } from "@/hooks/useChats";
import { useState } from "react";
import { View } from "react-native";

export default function ChatsScreen() {
    const { currentUser } = useAuth();
    const router = useRouter();

    const [search, setSearch] = useState("");

    const {
        chats,
        refreshing,
        refresh,
    } = useChats();

    const filteredChats = chats.filter(chat =>
        chat.name
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    return (
        <View style={{ flex: 1, backgroundColor: "#FFF" }}>
            <Header
                title={'Chats'}
                onBack={() => router.back()}
                iconColor="#FFF"
            />
            <ScreenContainer paddingTop={50}>

                <SearchBar
                    value={search}
                    onChangeText={setSearch}
                />

                <ChatList
                    chats={filteredChats}
                    refreshing={refreshing}
                    onRefresh={refresh}
                />

            </ScreenContainer>
        </View>
    );
}