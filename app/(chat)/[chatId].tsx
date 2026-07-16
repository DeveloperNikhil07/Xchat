import ChatHeader from "@/components/chat/ChatHeader";
import MessageInput from "@/components/chat/MessageInput";
import MessageList from "@/components/chat/MessageList";
import ScreenContainer from "@/components/layout/ScreenContainer";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";

import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import { KeyboardStickyView } from "react-native-keyboard-controller";
export interface Message {
    id: string;
    message: string;
    time: string;
    isSender: boolean;
    status?: "sending" | "sent" | "delivered" | "seen";
    date?: string;
}


const messages: Message[] = [
    {
        id: "1",
        message: "Hey 👋",
        time: "10:01",
        isSender: false,
        date: "Yesterday",
    },
    {
        id: "2",
        message: "Hi bro ❤️",
        time: "10:02",
        isSender: true,
        status: "seen",
        date: "Yesterday",
    },
    {
        id: "3",
        message: "Kya haal hai?",
        time: "10:03",
        isSender: false,
        date: "Yesterday",
    },
    {
        id: "4",
        message: "Bilkul mast 😎 tum batao",
        time: "10:04",
        isSender: true,
        status: "delivered",
        date: "Yesterday",
    },
    {
        id: "5",
        message: "Aaj ka plan kya hai?",
        time: "10:05",
        isSender: false,
        date: "Yesterday",
    },
    {
        id: "6",
        message: "Office jana hai abhi",
        time: "10:06",
        isSender: true,
        status: "seen",
        date: "Yesterday",
    },
    {
        id: "7",
        message: "Okay 👍",
        time: "10:07",
        isSender: false,
        date: "Yesterday",
    },
    {
        id: "8",
        message: "Lunch hua?",
        time: "10:08",
        isSender: false,
        date: "Yesterday",
    },
    {
        id: "9",
        message: "Haan abhi kiya 😊",
        time: "10:09",
        isSender: true,
        status: "seen",
        date: "Yesterday",
    },
    {
        id: "10",
        message: "Nice 🔥",
        time: "10:10",
        isSender: false,
        date: "Yesterday",
    },

    {
        id: "11",
        message: "Kal mil sakte ho?",
        time: "09:10",
        isSender: false,
        date: "Today",
    },
    {
        id: "12",
        message: "Haan bilkul milte hain",
        time: "09:11",
        isSender: true,
        status: "delivered",
        date: "Today",
    },
    {
        id: "13",
        message: "Kaha milna hai?",
        time: "09:12",
        isSender: false,
        date: "Today",
    },
    {
        id: "14",
        message: "Cafe me milte hain ☕",
        time: "09:13",
        isSender: true,
        status: "seen",
        date: "Today",
    },
    {
        id: "15",
        message: "Theek hai 👍",
        time: "09:14",
        isSender: false,
        date: "Today",
    },
    {
        id: "16",
        message: "Time bata dena",
        time: "09:15",
        isSender: false,
        date: "Today",
    },
    {
        id: "17",
        message: "5 baje ke aas paas",
        time: "09:16",
        isSender: true,
        status: "seen",
        date: "Today",
    },
    {
        id: "18",
        message: "Done bro",
        time: "09:17",
        isSender: false,
        date: "Today",
    },
    {
        id: "19",
        message: "Ek aur baat thi",
        time: "09:18",
        isSender: true,
        status: "delivered",
        date: "Today",
    },
    {
        id: "20",
        message: "Haan bolo",
        time: "09:19",
        isSender: false,
        date: "Today",
    },

    {
        id: "21",
        message: "Project complete ho gaya?",
        time: "11:20",
        isSender: false,
        date: "Today",
    },
    {
        id: "22",
        message: "Almost complete hai 🚀",
        time: "11:21",
        isSender: true,
        status: "seen",
        date: "Today",
    },
    {
        id: "23",
        message: "Great work 👏",
        time: "11:22",
        isSender: false,
        date: "Today",
    },
    {
        id: "24",
        message: "Thanks bro ❤️",
        time: "11:23",
        isSender: true,
        status: "seen",
        date: "Today",
    },
    {
        id: "25",
        message: "Kal update bhej dena",
        time: "11:24",
        isSender: false,
        date: "Today",
    },
    {
        id: "26",
        message: "Sure 👍",
        time: "11:25",
        isSender: true,
        status: "delivered",
        date: "Today",
    },
    {
        id: "27",
        message: "Good night 🌙",
        time: "11:30",
        isSender: false,
        date: "Today",
    },
    {
        id: "28",
        message: "Good night bro ❤️",
        time: "11:31",
        isSender: true,
        status: "seen",
        date: "Today",
    },
    {
        id: "29",
        message: "Take care 😊",
        time: "11:32",
        isSender: false,
        date: "Today",
    },
    {
        id: "30",
        message: "You too 🙌",
        time: "11:33",
        isSender: true,
        status: "seen",
        date: "Today",
    },

    {
        id: "31",
        message: "Voice message",
        time: "12:01",
        isSender: false,
        date: "Today",
    },
    {
        id: "32",
        message: "Okay sunta hu",
        time: "12:02",
        isSender: true,
        status: "delivered",
        date: "Today",
    },
    {
        id: "33",
        message: "Photo bhej raha hu",
        time: "12:03",
        isSender: false,
        date: "Today",
    },
    {
        id: "34",
        message: "Received ✅",
        time: "12:04",
        isSender: true,
        status: "seen",
        date: "Today",
    },
    {
        id: "35",
        message: "Nice picture 🔥",
        time: "12:05",
        isSender: false,
        date: "Today",
    },
    {
        id: "36",
        message: "Thank you 😄",
        time: "12:06",
        isSender: true,
        status: "seen",
        date: "Today",
    },
    {
        id: "37",
        message: "Milte hain jaldi",
        time: "12:07",
        isSender: false,
        date: "Today",
    },
    {
        id: "38",
        message: "Sure bro",
        time: "12:08",
        isSender: true,
        status: "delivered",
        date: "Today",
    },
    {
        id: "39",
        message: "Bye 👋",
        time: "12:09",
        isSender: false,
        date: "Today",
    },
    {
        id: "40",
        message: "Bye ❤️",
        time: "12:10",
        isSender: true,
        status: "seen",
        date: "Today",
    },
];

export default function ChatScreen() {
    const [inputHeight, setInputHeight] = useState(0);
    const { chatId, name } = useLocalSearchParams();


    console.log("Chat ID:", chatId);
    console.log("User Name:", name);


    return (
        <ScreenContainer>

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                <View style={{ flex: 1 }}>

                    <ChatHeader
                        name={(name as string) || "User"}
                        image={require("@/assets/images/man.png")}
                        online
                        onBack={() => router.back()}
                        onVoiceCall={() => { }}
                        onVideoCall={() => { }}
                        onMenu={() => { }}
                    />

                    <MessageList messages={messages} bottomInset={inputHeight} />

                    <KeyboardStickyView onLayout={(event) => {
                        setInputHeight(event.nativeEvent.layout.height);
                    }}>
                        <MessageInput
                            onSend={(text) => console.log(text)}
                            onEmojiPress={() => { }}
                            onAttachmentPress={() => { }}
                            onCameraPress={() => { }}
                            onVoicePress={() => { }}
                        />
                    </KeyboardStickyView>

                </View>

            </TouchableWithoutFeedback>

        </ScreenContainer>
    );
}