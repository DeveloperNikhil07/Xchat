import { FlatList, Text, View } from "react-native";
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



export default function ChatList() {
  if (chats.length === 0) {
    return <EmptyChatState />;
  } 
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>All Chats</Text>

        <Text style={styles.count}>
          {chats.length} Chats
        </Text>
      </View>

      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <ChatCard {...item} />
        )}
      />
    </View>
  );
}