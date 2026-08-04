import React, { useEffect, useMemo, useState } from "react";
import { Alert, View } from "react-native";

import ChatFilters from "@/components/home/ChatFilters";
import ChatList from "@/components/home/ChatList";
import ChatListSkeleton from "@/components/home/ChatListSkeleton";
import FloatingActionButton from "@/components/home/FloatingActionButton";
import HomeHeader from "@/components/home/HomeHeader";
import RecentUsers from "@/components/home/RecentUsers";
import RecentUsersSkeleton from "@/components/home/RecentUsersSkeleton";
import SearchUserModal from "@/components/home/search/SearchUserModal";
import ScreenContainer from "@/components/layout/ScreenContainer";
import SearchBar from "@/components/ui/SearchBar";

import { useAuth } from "@/hooks/useAuth";
import { useChats } from "@/hooks/useChats";

import { listenPendingRequests, sendChatRequest } from "@/services/request.service";
import { ChatListItem } from "@/types/chat/chatListItem";

export default function Home() {
    const { currentUser } = useAuth();

    const [search, setSearch] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("all");
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [requests, setRequests] = useState<any[]>([]);

    const {
        chats,
        recentUsers,
        loading,
        refreshing,
        refresh,
    } = useChats();

    const filters = useMemo(() => {

        const requestFilter = {
            id: "requests",
            label: "Requests",
            count: requests.length,
        };


        const defaultFilters = [
            {
                id: "all",
                label: "All",
            },
            {
                id: "unread",
                label: "Unread",
                count: 8,
            },
            {
                id: "groups",
                label: "Groups",
            },
            {
                id: "archived",
                label: "Archived",
            },
        ];


        if (requests.length > 0) {
            return [
                requestFilter,
                ...defaultFilters,
            ];
        }


        return [
            ...defaultFilters,
            requestFilter,
        ];


    }, [requests]);

    const handleSendRequest = async (user: {
        uid: string;
        displayName?: string;
        username: string;
        photoURL?: string;
    }) => {
        try {
            if (!currentUser) return;

            await sendChatRequest(currentUser.uid, user.uid);

            Alert.alert(
                "Success",
                `Request sent to ${user.displayName || user.username}`
            );

            setShowSearchModal(false);
        } catch (error: any) {
            Alert.alert(
                "Error",
                error.message || "Unable to send request."
            );
        }
    };

    useEffect(() => {

        if (!currentUser) return;

        const unsubscribe = listenPendingRequests(
            currentUser.uid,
            setRequests
        );

        return unsubscribe;

    }, [currentUser]);

    const requestChats: ChatListItem[] = useMemo(() => {
        return requests.map((item) => ({
            id: item.id,
            image: item.senderPhoto || "",
            name:
                item.senderName ||
                item.senderUsername ||
                "New Request",
            message: "New friend request",
            time: "",
            unread: 1,
            online: false,
            typing: false,
            voice: false,
            archived: false,
            type: "request",
            photoURL: item.senderPhoto || "",
        }));
    }, [requests]);

    const filteredChats = useMemo(() => {

        if (selectedFilter === "requests") {
            return requestChats;
        }

        return chats.filter((chat) => {

            const matchSearch = chat.name
                .toLowerCase()
                .includes(search.toLowerCase());

            if (!matchSearch) return false;


            if (selectedFilter === "unread") {
                return chat.unread > 0;
            }


            if (selectedFilter === "groups") {
                return chat.type === "group";
            }


            if (selectedFilter === "archived") {
                return chat.archived;
            }


            return true;

        });

    }, [
        chats,
        requestChats,
        search,
        selectedFilter,
    ]);
    return (
        <ScreenContainer>
            <HomeHeader userName={currentUser?.displayName || ""} />

            <SearchBar
                value={search}
                onChangeText={setSearch}
            />

            {loading ? (
                <RecentUsersSkeleton />
            ) : recentUsers.length > 0 ? (
                <RecentUsers users={recentUsers} />
            ) : null}

            <ChatFilters
                filters={filters}
                selected={selectedFilter}
                onChange={setSelectedFilter}
            />

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
                onPress={() => setShowSearchModal(true)}
            />

            <SearchUserModal
                visible={showSearchModal}
                onClose={() => setShowSearchModal(false)}
                currentUser={{
                    uid: currentUser?.uid || "",
                }}
                onAdd={handleSendRequest}
            />
        </ScreenContainer>
    );
}