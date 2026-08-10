
import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, {
    cancelAnimation,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
} from "react-native-reanimated";

import styles from "./MessageStatus.styles";

interface Props {
    status?: "sending" | "sent" | "delivered" | "seen";
    deliveredTo?: string[];
    seenBy?: string[];
    receiverId?: string;
    size?: number;
}

interface DotProps {
    color: string;
    size: number;
    delay?: number;
    animated?: boolean;
}

function Dot({
    color,
    size,
    delay = 0,
    animated = false,
}: DotProps) {
    const opacity = useSharedValue(1);
    const scale = useSharedValue(1);

    useEffect(() => {
        if (!animated) {
            opacity.value = 1;
            scale.value = 1;
            return;
        }

        const timer = setTimeout(() => {
            opacity.value = withRepeat(
                withTiming(0.35, { duration: 450 }),
                -1,
                true
            );

            scale.value = withRepeat(
                withTiming(0.75, { duration: 450 }),
                -1,
                true
            );
        }, delay);

        return () => {
            clearTimeout(timer);
            cancelAnimation(opacity);
            cancelAnimation(scale);
        };
    }, [animated, delay]);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [
            {
                scale: scale.value,
            },
        ],
    }));

    return (
        <Animated.View
            style={[
                {
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    backgroundColor: color,
                },
                animatedStyle,
            ]}
        />
    );
}

export default function MessageStatus({
    status = "sent",
    deliveredTo = [],
    seenBy = [],
    receiverId,
    size = 6,
}: Props) {

    /*
     * IMPORTANT:
     *
     * seenBy ko sabse pehle check karo.
     * Agar receiver ne message dekh liya hai,
     * to blue hona chahiye even if status field
     * abhi "delivered" hai.
     */

    const isSeen =
        receiverId
            ? seenBy.includes(receiverId)
            : status === "seen";

    const isDelivered =
        receiverId
            ? deliveredTo.includes(receiverId)
            : status === "delivered" || status === "seen";

    // 🔵 SEEN
    if (isSeen) {
        return (
            <View style={styles.container}>
                <Dot
                    color="#34C7FF"
                    size={size}
                />

                <Dot
                    color="#34C7FF"
                    size={size}
                />

                <Dot
                    color="#34C7FF"
                    size={size}
                />
            </View>
        );
    }

    // 🟡 DELIVERED
    if (isDelivered) {
        return (
            <View style={styles.container}>
                <Dot
                    color="#FFD60A"
                    size={size}
                />

                <Dot
                    color="#FFD60A"
                    size={size}
                />

                <Dot
                    color="#FFD60A"
                    size={size}
                />
            </View>
        );
    }

    // 🔴🟡🟢 SENDING
    if (status === "sending") {
        return (
            <View style={styles.container}>
                <Dot
                    color="#FF3B30"
                    size={size}
                    delay={0}
                    animated
                />

                <Dot
                    color="#FFD60A"
                    size={size}
                    delay={150}
                    animated
                />

                <Dot
                    color="#30D158"
                    size={size}
                    delay={300}
                    animated
                />
            </View>
        );
    }

    // ⚪ SENT
    if (status === "sent") {
        return (
            <View style={styles.container}>
                <Dot
                    color="#FFFFFF"
                    size={size}
                />

                <Dot
                    color="#FFFFFF"
                    size={size}
                />

                <Dot
                    color="#FFFFFF"
                    size={size}
                />
            </View>
        );
    }

    return null;
}