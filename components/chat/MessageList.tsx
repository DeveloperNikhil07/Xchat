import { FlatList } from "react-native";

import DateSeparator from "./DateSeparator";
import MessageBubble from "./MessageBubble";

export interface Message {
  id: string;
  message: string;
  time: string;
  isSender: boolean;
  status?: "sending" | "sent" | "delivered" | "seen";
  date?: string;
}

interface MessageListProps {
  messages: Message[];
  bottomInset: number;
}

export default function MessageList({
  messages,
  bottomInset,
}: MessageListProps) {
  return (
    <FlatList
      data={messages}
      style={{ flex: 1 }}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      automaticallyAdjustKeyboardInsets
      contentContainerStyle={{
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: bottomInset + 280,
      }}
      keyboardDismissMode="interactive"
      renderItem={({ item, index }) => {
        const previous = messages[index - 1];

        const showDate =
          index === 0 ||
          previous?.date !== item.date;

        return (
          <>
            {showDate && (
              <DateSeparator
                label={item.date || "Today"}
              />
            )}

            <MessageBubble
              message={item.message}
              time={item.time}
              isSender={item.isSender}
              status={item.status}
            />
          </>
        );
      }}
    />
  );
}