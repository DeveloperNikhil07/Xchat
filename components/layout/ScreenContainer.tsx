import Colors from "@/constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import React, { ReactNode } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    View,
} from "react-native";

interface Props {
    children: ReactNode;
    paddingHorizontal?: number;
    background?: boolean;
}

export default function ScreenContainer({
    children,
    paddingHorizontal = 20,
    background = true,
}: Props) {
    const Content = (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <SafeAreaView style={styles.safe}>
                <View
                    style={[
                        styles.content,
                        {
                            paddingHorizontal,
                        },
                    ]}
                >
                    {children}
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );

    if (!background) {
        return (
            <>
                <StatusBar
                    translucent
                    backgroundColor="transparent"
                    barStyle="light-content"
                />
                {Content}
            </>
        );
    }

    return (
        <LinearGradient
            colors={[
                Colors.background,
                Colors.brandDark,
                Colors.brandPrimary,
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}
        >
            <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle="light-content"
            />
            {Content}
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safe: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
});