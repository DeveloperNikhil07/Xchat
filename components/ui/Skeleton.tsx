import { useEffect, useRef } from "react";
import { Animated, DimensionValue, ViewStyle } from "react-native";
import { styles } from "./Skeleton.style";

interface SkeletonProps {
    width: DimensionValue;
    height: number;
    radius?: number;
    style?: ViewStyle;
}

export default function Skeleton({
    width,
    height,
    radius = 10,
    style,
}: SkeletonProps) {
    const opacity = useRef(new Animated.Value(0.4)).current;

    useEffect(() => {
        const loop = Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 700,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 0.4,
                    duration: 700,
                    useNativeDriver: true,
                }),
            ])
        );

        loop.start();

        return () => loop.stop();
    }, [opacity]);

    return (
        <Animated.View
            style={[
                styles.skeleton,
                {
                    width,
                    height,
                    borderRadius: radius,
                    opacity,
                },
                style,
            ]}
        />
    );
}