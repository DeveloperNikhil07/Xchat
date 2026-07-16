import { Text, View } from "react-native";
import { styles } from "./MessageBubble.style";
import MessageStatus from "./MessageStatus";

interface MessageBubbleProps {
    message: string;
    time: string;
    isSender: boolean;
    status?: "sending" | "sent" | "delivered" | "seen";
}

export default function MessageBubble({
    message,
    time,
    isSender,
    status = "sent",
}: MessageBubbleProps) {


    return (
        <View
            style={[
                styles.container,
                isSender
                    ? styles.senderContainer
                    : styles.receiverContainer,
            ]}
        >
            <View
                style={[
                    styles.bubble,
                    isSender
                        ? styles.senderBubble
                        : styles.receiverBubble,
                ]}
            >
                <Text
                    style={[
                        styles.message,
                        isSender && styles.senderMessage,
                    ]}
                >
                    {message}
                </Text>

                <View style={styles.footer}>
                    <Text
                        style={[
                            styles.time,
                            isSender && styles.senderTime,
                        ]}
                    >
                        {time}
                    </Text>

                    {isSender && (
                        <MessageStatus
                            status={status}
                            color="rgba(255,255,255,.8)"
                            size={15}
                        />
                    )}
                </View>
            </View>
        </View>
    );
}