import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { FlatList, RefreshControl, Text, View } from "react-native";

import { ChatListItem } from "@/types/chat/chatListItem";
import ChatCard from "./ChatCard";
import { styles } from "./ChatList.style";
import EmptyChatState from "./EmptyChatState";

interface ChatListProps {
    chats: ChatListItem[];
    refreshing?: boolean;
    onRefresh?: () => void;
}

export default function ChatList({ chats, refreshing = false, onRefresh }: ChatListProps) {
    const router = useRouter();

    if (chats.length === 0) {
        return <EmptyChatState />;
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>All Chats</Text>
                <Text style={styles.count}>{chats.length} Chats</Text>
            </View>

            <View style={styles.refreshHint}>
                <Feather name="chevron-down" size={13} color="#B0B0B0" />
                <Text style={styles.refreshHintText}>Pull down to refresh</Text>
            </View>

            <FlatList
                data={chats}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.list}
                keyboardShouldPersistTaps="handled"
                automaticallyAdjustKeyboardInsets={false}
                refreshControl={
                    onRefresh ? (
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    ) : undefined
                }
                renderItem={({ item }) => (
                    <ChatCard
                        {...item}
                        onPress={() => {
                            router.push({
                                pathname: "/(chat)/[chatId]",
                                params: {
                                    chatId: item.id,
                                    name: item.name,
                                },
                            });
                        }}
                    />
                )}
            />
        </View>
    );
}