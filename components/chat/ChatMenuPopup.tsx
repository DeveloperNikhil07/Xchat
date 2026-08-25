import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import {
    Animated,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
} from "react-native";

interface MenuItem {
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
    danger?: boolean;
}

interface Props {
    visible: boolean;
    items: MenuItem[];
    onClose: () => void;
}

export default function ChatMenuPopup({ visible, items, onClose }: Props) {
    const opacity = useRef(new Animated.Value(0)).current;
    const scale = useRef(new Animated.Value(0.88)).current;

    useEffect(() => {
        if (visible) {
            Animated.parallel([
                Animated.timing(opacity, { toValue: 1, duration: 160, useNativeDriver: true }),
                Animated.spring(scale, { toValue: 1, tension: 180, friction: 14, useNativeDriver: true }),
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(opacity, { toValue: 0, duration: 100, useNativeDriver: true }),
                Animated.timing(scale, { toValue: 0.88, duration: 100, useNativeDriver: true }),
            ]).start();
        }
    }, [visible]);

    if (!visible) return null;

    return (
        <Pressable style={styles.backdrop} onPress={onClose}>
            <Animated.View style={[styles.menu, { opacity, transform: [{ scale }] }]}>
                {items.map((item, index) => (
                    <TouchableOpacity
                        key={item.label}
                        style={[styles.item, index < items.length - 1 && styles.itemBorder]}
                        activeOpacity={0.7}
                        onPress={() => { onClose(); setTimeout(item.onPress, 120); }}
                    >
                        <Ionicons
                            name={item.icon}
                            size={18}
                            color={item.danger ? "#FF4D4F" : "#E9EDEF"}
                            style={styles.itemIcon}
                        />
                        <Text style={[styles.itemLabel, item.danger && styles.itemLabelDanger]}>
                            {item.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </Animated.View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    backdrop: {
        position: "absolute",
        top: 30,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
    },
    menu: {
        position: "absolute",
        top: 52,
        right: 0,
        backgroundColor: "#233138",
        borderRadius: 8,
        minWidth: 200,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.45,
        shadowRadius: 14,
        elevation: 18,
        overflow: "hidden",
    },
    item: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 13,
        paddingHorizontal: 16,
    },
    itemBorder: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "rgba(255,255,255,0.08)",
    },
    itemIcon: { marginRight: 14 },
    itemLabel: { color: "#E9EDEF", fontSize: 15, fontWeight: "400" },
    itemLabelDanger: { color: "#FF4D4F" },
});
