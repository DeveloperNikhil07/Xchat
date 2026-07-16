import Colors from "@/constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import React, { ReactNode } from "react";
import {
    StatusBar,
    StyleSheet,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
        <SafeAreaView
            style={styles.safe}
            edges={["top", "left", "right", "bottom"]}
        >
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
            start={{
                x: 0,
                y: 0,
            }}
            end={{
                x: 1,
                y: 1,
            }}
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