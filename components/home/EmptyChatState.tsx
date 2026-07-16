import Colors from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef } from "react";
import {
    Animated,
    Image,
    Text,
    View,
} from "react-native";
import { styles } from "./EmptyChatState.style";

export default function EmptyChatState() {
    const floatAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(floatAnim, {
                    toValue: -8,
                    duration: 1800,
                    useNativeDriver: true,
                }),
                Animated.timing(floatAnim, {
                    toValue: 0,
                    duration: 1800,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                    styles.card,
                    {
                        transform: [{ translateY: floatAnim }],
                    },
                ]}
            >
                {/* Logo */}

                <LinearGradient
                    colors={[
                        Colors.brandPrimary,
                        Colors.brandLight,
                    ]}
                    style={styles.logoWrapper}
                >
                    <Image
                        source={require("@/assets/images/logo.png")}
                        style={styles.logo}
                    />
                </LinearGradient>

                {/* Heading */}

                <Text style={styles.title}>
                    Welcome to XChat
                </Text>

                <Text style={styles.subtitle}>
                    Your conversations will appear here once
                    you start chatting with your friends.
                </Text>

                <View style={styles.divider} />

                {/* Dummy Conversation */}

                <View style={styles.chatPreview}>
                    <View style={styles.leftBubble}>
                        <Text style={styles.leftText}>
                            Hello 👋
                        </Text>
                    </View>

                    <View style={styles.rightBubble}>
                        <Text style={styles.rightText}>
                            Hi there 😊
                        </Text>
                    </View>

                    <View style={styles.leftBubble}>
                        <Text style={styles.leftText}>
                            Welcome to XChat
                        </Text>
                    </View>

                    <View style={styles.rightBubble}>
                        <Ionicons
                            name="ellipsis-horizontal"
                            size={20}
                            color="#fff"
                        />
                    </View>
                </View>

                <View style={styles.bottomDivider} />

                <Text style={styles.hint}>
                    Tap the
                    <Text style={styles.plus}> ＋ </Text>
                    button below to start your first chat.
                </Text>
            </Animated.View>
        </View>
    );
}