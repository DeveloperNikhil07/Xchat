import Colors from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { styles } from "./SearchBar.style";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onMicPress?: () => void;
}

export default function SearchBar({
  value,
  onChangeText,
  placeholder = "Search conversations...",
  onMicPress,
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      <Ionicons
        name="search"
        size={20}
        color={Colors.textSecondary}
      />

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.textSecondary}
        style={styles.input}
        cursorColor={Colors.brandPrimary}
        selectionColor={Colors.brandPrimary}
      />

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onMicPress}
        style={styles.micButton}
      >
        <Ionicons
          name="mic"
          size={18}
          color={Colors.brandPrimary}
        />
      </TouchableOpacity>
    </View>
  );
}