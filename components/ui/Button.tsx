import { styles } from "@/components/ui/button.style";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

interface Props {
  title: string;
  onPress: () => Promise<void> | void;
  icon?: keyof typeof Ionicons.glyphMap;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  iconColor?: string;
}

export default function Button({
  title,
  onPress,
  icon = "arrow-forward",
  loading = false,
  disabled = false,
  style,
  textStyle,
  iconColor = "#fff",
}: Props) {
  const [internalLoading, setInternalLoading] = useState(false);

  const isLoading = loading || internalLoading;

  const handlePress = async () => {
    if (isLoading || disabled) return;

    setInternalLoading(true);

    try {
      await onPress();
    } finally {
      setInternalLoading(false);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      disabled={isLoading || disabled}
      onPress={handlePress}
      style={[
        styles.button,
        (isLoading || disabled) && styles.disabledButton,
        style,
      ]}
    >
      {isLoading ? (
        <ActivityIndicator
          size="small"
          color="#FFFFFF"
          style={{
            paddingVertical: 2,
          }}
        />
      ) : (
        <>
          <Text style={[styles.buttonText, textStyle]}>
            {title}
          </Text>

          <Ionicons
            name={icon}
            size={22}
            color={iconColor}
            style={styles.icon}
          />
        </>
      )}
    </TouchableOpacity>
  );
}