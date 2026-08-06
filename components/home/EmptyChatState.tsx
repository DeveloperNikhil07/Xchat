import Colors from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef } from "react";
import { Animated, Text, View } from "react-native";
import { styles } from "./EmptyChatState.style";

export default function EmptyChatState() {
    const floatAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(floatAnim, {
                    toValue: -6,
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
            <View style={styles.card}>
                <Animated.View
                    style={[
                        styles.iconWrapper,
                        { transform: [{ translateY: floatAnim }] },
                    ]}
                >
                    <LinearGradient
                        colors={[Colors.brandPrimary, Colors.brandLight]}
                        style={styles.iconCircle}
                    >
                        <Ionicons
                            name="chatbubble-ellipses"
                            size={32}
                            color="#fff"
                        />
                    </LinearGradient>
                </Animated.View>

                <Text style={styles.title}>No chats yet</Text>

                <Text style={styles.subtitle}>
                    Tap the + button to start a new conversation
                </Text>
            </View>
        </View>
    );
}