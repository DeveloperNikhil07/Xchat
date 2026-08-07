import React, { forwardRef, useCallback, useRef } from "react";
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
      onContactPress,
    },
    ref
  ) => {
    // Internal ref use karte hain taaki scrollToIndex ke liye
    // list ke andar hi access mil jaye, chahe parent bhi ref pass kare.
    const internalRef = useRef<FlatList<Message>>(null);

    const setRefs = useCallback(
      (node: FlatList<Message>) => {
        internalRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<FlatList<Message> | null>).current =
            node;
        }
      },
      [ref]
    );

    // Reply pe tap karne par original message tak scroll karo
    const handleReplyPress = useCallback(
      (messageId: string) => {
        const index = messages.findIndex((m) => m.id === messageId);
        if (index === -1) return;

        internalRef.current?.scrollToIndex({
          index,
          animated: true,
          viewPosition: 0.5, // screen ke beech mein laao, taaki context clear dikhe
        });
      },
      [messages]
    );

    // FlatList variable-height items ke saath scrollToIndex kabhi fail
    // ho sakta hai (agar target abhi render/measure nahi hua). Fallback:
    // approximate offset pe pehle scroll karo, phir retry karo.
    const handleScrollToIndexFailed = useCallback(
      (info: {
        index: number;
        highestMeasuredFrameIndex: number;
        averageItemLength: number;
      }) => {
        internalRef.current?.scrollToOffset({
          offset: info.averageItemLength * info.index,
          animated: true,
        });

        setTimeout(() => {
          internalRef.current?.scrollToIndex({
            index: info.index,
            animated: true,
            viewPosition: 0.5,
          });
        }, 300);
      },
      []
    );

    return (
      <FlatList
        ref={setRefs}
        data={messages}
        style={{ flex: 1 }}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        automaticallyAdjustKeyboardInsets
        keyboardDismissMode="interactive"
        scrollEventThrottle={16}
        onScroll={onScroll}
        onScrollToIndexFailed={handleScrollToIndexFailed}
        contentContainerStyle={{
          paddingTop: 12,
          paddingBottom: bottomInset + 280,
        }}
        renderItem={({ item, index }) => {
          const previous = messages[index - 1];

          const showDate =
            index === 0 || previous?.date !== item.date;

          return (
            <>
              {showDate && (
                <DateSeparator label={item.date || "Today"} />
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
                deliveredTo={item.deliveredTo}
                seenBy={item.seenBy}
                isStarred={item.isStarred}
                reaction={item.reaction}
                onImagePress={() => onImagePress?.(item.image!)}
                onVideoPress={() => {
                  if (item.video) onVideoPress?.(item.video.uri);
                }}
                onDocumentPress={() => {
                  if (item.document) onDocumentPress?.(item.document);
                }}
                onLocationPress={() => onLocationPress?.(item)}
                onContactPress={() => onContactPress?.(item)}
                onLongPress={() => onLongPressMessage?.(item)}
                onReplyPress={handleReplyPress}
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