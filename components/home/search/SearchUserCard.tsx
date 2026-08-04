import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Image,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import {
    acceptChatRequest,
    getRequestStatus,
    sendChatRequest,
} from "@/services/request.service";

import { styles } from "./SearchUserCard.style";

interface Props {
    uid: string;
    currentUserId: string;

    name: string;
    username: string;
    photoURL?: string;
    isOnline?: boolean;

    onMessage?: () => void;
}

export default function SearchUserCard({
    uid,
    currentUserId,
    name,
    username,
    photoURL,
    isOnline,
    onMessage,
}: Props) {
    console.log("Photo URL =>", photoURL);
    const [loading, setLoading] = useState(false);
    const [statusLoading, setStatusLoading] = useState(true);
    const [requestStatus, setRequestStatus] = useState<any>(null);

    useEffect(() => {
        loadStatus();
    }, []);

    const loadStatus = async () => {
        try {
            setStatusLoading(true);

            const status = await getRequestStatus(
                currentUserId,
                uid
            );

            setRequestStatus(status);
        } catch (error) {
            console.log(error);
        } finally {
            setStatusLoading(false);
        }
    };

    const handlePress = async () => {
        try {
            setLoading(true);

            if (requestStatus?.status === "accepted") {
                onMessage?.();
                return;
            }

            if (requestStatus?.type === "received") {
                await acceptChatRequest(requestStatus.requestId);
                await loadStatus();
                return;
            }

            if (requestStatus?.type === "sent") {
                return;
            }

            await sendChatRequest(currentUserId, uid);
            await loadStatus();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const getButtonTitle = () => {
        if (requestStatus?.status === "accepted") return "Message";
        if (requestStatus?.type === "received") return "Accept";
        if (requestStatus?.type === "sent") return "Requested";
        return "Add";
    };

    const isSent = requestStatus?.type === "sent";

    return (
        <View style={styles.container}>
            <View>
                <Image
                    source={
                        photoURL
                            ? { uri: photoURL }
                            : require("@/assets/images/man.png")
                    }
                    style={styles.avatar}
                />

                {isOnline && <View style={styles.online} />}
            </View>

            <View style={styles.info}>
                <Text style={styles.name} numberOfLines={1}>
                    {name}
                </Text>

                <Text style={styles.username} numberOfLines={1}>
                    @{username}
                </Text>
            </View>

            <TouchableOpacity
                style={[
                    styles.button,
                    isSent && styles.buttonDisabled,
                ]}
                onPress={handlePress}
                disabled={isSent || loading || statusLoading}
            >
                {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>
                        {getButtonTitle()}
                    </Text>
                )}
            </TouchableOpacity>
        </View>
    );
}