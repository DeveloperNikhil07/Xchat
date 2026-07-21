import React, { forwardRef } from "react";
import { FlatList, NativeScrollEvent, NativeSyntheticEvent } from "react-native";

import { Message } from "@/types/chat/message/message";

import DateSeparator from "./DateSeparator";
import MessageBubble from "./MessageBubble";

interface MessageListProps {
  messages: Message[];
  bottomInset: number;
  onLongPressMessage?: (message: Message) => void;
  onImagePress?: (image: string) => void;
  onLocationPress?: (message: Message) => void;
  onContactPress?: (message: Message) => void;

  onDocumentPress?: (
    document: NonNullable<Message["document"]>
  ) => void;
  onVideoPress?: (uri: string) => void;
  onScroll?: (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => void;
}

const MessageList = forwardRef<FlatList<Message>, MessageListProps>(
  (
    {
      messages,
      bottomInset,
      onLongPressMessage,
      onImagePress,
      onDocumentPress,
      onScroll,
      onVideoPress,
      onLocationPress,
      onContactPress
    },
    ref
  ) => {
    return (
      <FlatList
        ref={ref}
        data={messages}
        style={{ flex: 1 }}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        automaticallyAdjustKeyboardInsets
        keyboardDismissMode="interactive"
        scrollEventThrottle={16}
        onScroll={onScroll}
        contentContainerStyle={{
          paddingTop: 12,
          paddingBottom: bottomInset + 280,
        }}
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
                type={item.type}
                message={item.message}
                image={item.image}
                video={item.video}
                document={item.document}
                audio={item.audio}
                location={item.location}
                contact={item.contact}
                reply={item.reply}
                time={item.time}
                isSender={item.isSender}
                status={item.status}
                isStarred={item.isStarred}
                reaction={item.reaction}
                onImagePress={() => onImagePress?.(item.image!)}
                onVideoPress={() => { if (item.video) onVideoPress?.(item.video.uri); }}
                onDocumentPress={() => { if (item.document) onDocumentPress?.(item.document); }}
                onLocationPress={() => onLocationPress?.(item)}
                onContactPress={() => onContactPress?.(item)}
                onLongPress={() => onLongPressMessage?.(item)}
              />
            </>
          );
        }}
      />
    );
  }
);

MessageList.displayName = "MessageList";

export default MessageList;