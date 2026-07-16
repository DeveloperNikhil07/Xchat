import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { FlatList, RefreshControl, Text, View } from "react-native";
import ChatCard from "./ChatCard";
import { styles } from "./ChatList.style";
import EmptyChatState from "./EmptyChatState";

const chats = [
  {
    id: "1",
    name: "Alex",
    message: "Hey bro, what's up?",
    time: "2m",
    unread: 2,
    online: true,
    image: require("@/assets/images/man.png"),
  },
  {
    id: "2",
    name: "Emma",
    message: "Typing...",
    time: "5m",
    unread: 0,
    typing: true,
    online: true,
    image: require("@/assets/images/man.png"),
  },
  {
    id: "3",
    name: "John",
    message: "Voice Message",
    time: "Yesterday",
    unread: 0,
    voice: true,
    image: require("@/assets/images/man.png"),
  },
  {
    id: "4",
    name: "Sarah",
    message: "See you tomorrow ❤️",
    time: "Mon",
    unread: 1,
    image: require("@/assets/images/man.png"),
  },
];

interface ChatListProps {
  refreshing?: boolean;
  onRefresh?: () => void;
}

export default function ChatList({ refreshing = false, onRefresh }: ChatListProps) {
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

      {/* Pull to refresh hint */}
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
        renderItem={({ item }) => <ChatCard {...item} onPress={() => {
          router.push({
            pathname: "/(chat)/[chatId]",
            params: {
              chatId: item.id,
              name: item.name,
            },
          });
        }} />}
      />
    </View>
  );
}