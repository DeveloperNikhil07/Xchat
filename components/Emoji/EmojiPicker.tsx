import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import {
    FlatList,
    Modal,
    Pressable,
    Text,
    TextInput,
    View,
} from "react-native";

import { EMOJI_CATEGORIES } from "@/assets/data/emojiData";
import styles from "./EmojiPicker.style";

interface EmojiPickerProps {
    visible: boolean;
    onClose: () => void;
    onSelect: (emoji: string) => void;
}

export default function EmojiPicker({
    visible,
    onClose,
    onSelect,
}: EmojiPickerProps) {
    const [activeCategory, setActiveCategory] = useState(0);
    const [search, setSearch] = useState("");

    // Search sirf emoji-characters ke saath ek flat list banata hai —
    // koi image asset nahi, isliye kabhi resolve-error nahi aayega
    const displayedEmojis = useMemo(() => {
        if (search.trim().length > 0) {
            return EMOJI_CATEGORIES.flatMap((c) => c.emojis);
        }
        return EMOJI_CATEGORIES[activeCategory]?.emojis ?? [];
    }, [search, activeCategory]);

    const handleSelect = (emoji: string) => {
        onSelect(emoji);
        setSearch("");
        onClose();
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            statusBarTranslucent
            onRequestClose={onClose}
        >
            <Pressable style={styles.overlay} onPress={onClose}>
                <Pressable style={styles.container}>
                    {/* Search bar */}
                    <View style={styles.searchRow}>
                        <Ionicons name="search" size={16} color="#8696A0" />
                        <TextInput
                            value={search}
                            onChangeText={setSearch}
                            placeholder="Search emoji"
                            placeholderTextColor="#8696A0"
                            style={styles.searchInput}
                        />
                    </View>

                    {/* Category tabs */}
                    {search.trim().length === 0 && (
                        <View style={styles.categoryRow}>
                            {EMOJI_CATEGORIES.map((cat, index) => (
                                <Pressable
                                    key={cat.title}
                                    onPress={() => setActiveCategory(index)}
                                    style={[
                                        styles.categoryTab,
                                        activeCategory === index &&
                                            styles.categoryTabActive,
                                    ]}
                                >
                                    <Text style={styles.categoryIcon}>
                                        {cat.icon}
                                    </Text>
                                </Pressable>
                            ))}
                        </View>
                    )}

                    {/* Emoji grid */}
                    <FlatList
                        data={displayedEmojis}
                        keyExtractor={(item, index) => `${item}-${index}`}
                        numColumns={8}
                        contentContainerStyle={styles.grid}
                        renderItem={({ item }) => (
                            <Pressable
                                style={styles.emojiCell}
                                onPress={() => handleSelect(item)}
                            >
                                <Text style={styles.emojiText}>{item}</Text>
                            </Pressable>
                        )}
                    />
                </Pressable>
            </Pressable>
        </Modal>
    );
}