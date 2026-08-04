import { styles } from "@/styles/splash.style";
import React, { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";

export default function Splash() {
    const logoScale = useRef(new Animated.Value(0.6)).current;
    const logoOpacity = useRef(new Animated.Value(0)).current;
    const titleOpacity = useRef(new Animated.Value(0)).current;
    const titleTranslateY = useRef(new Animated.Value(12)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.parallel([
                Animated.timing(logoOpacity, {
                    toValue: 1,
                    duration: 450,
                    easing: Easing.out(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.spring(logoScale, {
                    toValue: 1,
                    friction: 5,
                    tension: 60,
                    useNativeDriver: true,
                }),
            ]),
            Animated.parallel([
                Animated.timing(titleOpacity, {
                    toValue: 1,
                    duration: 400,
                    easing: Easing.out(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(titleTranslateY, {
                    toValue: 0,
                    duration: 400,
                    easing: Easing.out(Easing.ease),
                    useNativeDriver: true,
                }),
            ]),
        ]).start();
    }, []);

    // 👇 Koi router.replace() nahi yahan.
    // Ye component sirf visual hai, navigation index.tsx control karega.

    return (
        <Animated.View style={styles.container}>
            <Animated.Image
                source={require("../assets/images/splash-icon-light.png")}
                style={[
                    styles.logo,
                    {
                        opacity: logoOpacity,
                        transform: [{ scale: logoScale }],
                    },
                ]}
                resizeMode="contain"
            />
            <Animated.Text
                style={[
                    styles.title,
                    {
                        opacity: titleOpacity,
                        transform: [{ translateY: titleTranslateY }],
                    },
                ]}
            >
                Welcome to Xchat
            </Animated.Text>
        </Animated.View>
    );
}