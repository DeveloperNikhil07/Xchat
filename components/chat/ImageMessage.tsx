import React from "react";
import {
    Image,
    Pressable,
} from "react-native";

import styles from "./ImageMessage.style";

interface Props {
    uri: string;
    onPress?: () => void;
}

export default function ImageMessage({
    uri,
    onPress,
}: Props) {

    return (
        <Pressable
             onPress={onPress}
        >
            <Image
                source={{ uri }}
                style={styles.image}
            />
        </Pressable>
    );
}