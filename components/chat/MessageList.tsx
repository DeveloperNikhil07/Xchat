import React, { forwardRef, useCallback, useEffect, useRef } from "react";
import { FlatList, NativeScrollEvent, NativeSyntheticEvent } from "react-native";

import { Message } from "@/types/chat/message/message";

import DateSeparator from "./DateSeparator";
import MessageBubble from "./MessageBubble";

interface MessageListProps {
  messages: Message[];
  bottomInset: number;
  keyboardHeight?: number; // 👈 naya — keyboard ki actual height, static "+280" ki jagah
  chatId?: string;         // 👈 naya — chat switch hone par "first open = scroll to bottom" reset karne ke liye
  onLongPressMessage?: (message: Message) => void;
  onImagePress?: (image: string) => void;
  onLocationPress?: (message: Message) => void;
  onContactPress?: (message: Message) => void;
  onReplyMessage?: (message: Message) => void;

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
      keyboardHeight = 0,
      chatId,
      onReplyMessage,
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
    const internalRef = useRef<FlatList<Message>>(null);
    // User bottom ke kitne paas hai — isi se decide hoga ki naya message
    // aane par auto-scroll karna hai ya nahi (WhatsApp jaisa behavior:
    // agar user upar scroll karke purane messages padh raha hai, to
    // naya message aane par usse force-scroll nahi karte)
    const isNearBottomRef = useRef(true);

    // Chat pehli baar khula hai ya nahi — pehli baar khulte hi seedha
    // last message pe (bina animation ke) jump karna hai
    const isFirstLoadRef = useRef(true);

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

    const handleReplyPress = useCallback(
      (messageId: string) => {
        const index = messages.findIndex((m) => m.id === messageId);
        if (index === -1) return;

        internalRef.current?.scrollToIndex({
          index,
          animated: true,
          viewPosition: 0.5,
        });
      },
      [messages]
    );

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

    // 👇 FIX: scroll position track karta hai taaki pata chale user
    // bottom ke paas hai ya upar chala gaya. Ye onScroll ko parent
    // (ChatScreen) tak bhi forward karta hai taaki wahan ka arrow
    // button logic bhi sahi values ke saath kaam kare.
    const handleScroll = useCallback(
      (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        onScroll?.(event);

        const { contentOffset, contentSize, layoutMeasurement } =
          event.nativeEvent;
        const distanceFromBottom =
          contentSize.height - contentOffset.y - layoutMeasurement.height;

        isNearBottomRef.current = distanceFromBottom < 150;
      },
      [onScroll]
    );

    // 👇 FIX: naya chat khulne par (chatId badalne par) flags reset karo,
    // taaki har chat pehli baar khulte hi bottom pe jump kare, na ki
    // sirf app-lifetime mein ek hi baar.
    useEffect(() => {
      isFirstLoadRef.current = true;
      isNearBottomRef.current = true;
    }, [chatId]);

    // 👇 FIX: yehi missing tha. Chat khulte hi turant last message pe
    // (bina animation — WhatsApp jaisa instant jump), aur uske baad
    // jab bhi naya message aaye, sirf tab auto-scroll karo jab user
    // pehle se bottom ke paas ho, YA message khud bheja ho (sender).
    useEffect(() => {
      if (messages.length === 0) return;

      if (isFirstLoadRef.current) {
        isFirstLoadRef.current = false;
        requestAnimationFrame(() => {
          internalRef.current?.scrollToEnd({ animated: false });
        });
        return;
      }

      const lastMessage = messages[messages.length - 1];
      if (isNearBottomRef.current || lastMessage?.isSender) {
        requestAnimationFrame(() => {
          internalRef.current?.scrollToEnd({ animated: true });
        });
      }
    }, [messages.length]);

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
        onScroll={handleScroll}
        onScrollToIndexFailed={handleScrollToIndexFailed}
        contentContainerStyle={{
          paddingTop: 12,
          // 👇 FIX: static "+280" hata diya. Ab real keyboard height
          // dynamically add hoti hai — keyboard band → sirf chhota buffer
          // (12px), keyboard khula → uski exact height, taaki messages
          // kabhi keyboard ke peeche hide na hon aur band hone par bhi
          // koi extra khaali jagah na bache.
          paddingBottom: bottomInset + keyboardHeight + 12,
        }}
        renderItem={({ item, index }) => {
          const previous = messages[index - 1];

          const currentDate = item.date
            ? new Date(item.date)
            : null;

          const previousDate = previous?.date
            ? new Date(previous.date)
            : null;

          const isSameDay = (
            date1: Date | null,
            date2: Date | null
          ) => {
            if (!date1 || !date2) {
              return false;
            }

            return (
              date1.getFullYear() === date2.getFullYear() &&
              date1.getMonth() === date2.getMonth() &&
              date1.getDate() === date2.getDate()
            );
          };

          const showDate =
            index === 0 ||
            !isSameDay(currentDate, previousDate);

          return (
            <>
              {showDate && (
                <DateSeparator date={item.date} />
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
                deletedForEveryone={item.deletedForEveryone}
                isDeletedForMe={item.isDeletedForMe}
                edited={item.edited}
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
                onReplySwipe={() => onReplyMessage?.(item)}
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