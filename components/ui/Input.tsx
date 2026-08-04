import Colors from "@/constants/theme";
import { styles } from "./input.style";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
    KeyboardTypeOptions,
    Pressable,
    Text,
    TextInput,
    TextInputProps,
    View,
    ViewStyle,
} from "react-native";

interface Props extends TextInputProps {
    label?: string;
    icon?: keyof typeof Ionicons.glyphMap;
    isPassword?: boolean;
    error?: string;
    keyboardType?: KeyboardTypeOptions;
    containerStyle?: ViewStyle;
}

export default function Input({
    label,
    icon,
    isPassword = false,
    error,
    keyboardType = "default",
    containerStyle,
    ...rest
}: Props) {
    const [secure, setSecure] = useState(isPassword);
    const [focused, setFocused] = useState(false);

    return (
        <View style={[styles.wrapper, containerStyle]}>
            {!!label && <Text style={styles.label}>{label}</Text>}

            <View
                style={[
                    styles.container,
                    focused && styles.containerFocused,
                    !!error && styles.containerError,
                ]}
            >
                {icon && (
                    <Ionicons
                        name={icon}
                        size={18}
                        color={focused ? Colors.brandPrimary : Colors.textSecondary}
                        style={styles.leftIcon}
                    />
                )}

                <TextInput
                    style={[styles.input, !icon && styles.inputNoIcon]}
                    placeholderTextColor={Colors.textSecondary}
                    keyboardType={keyboardType}
                    secureTextEntry={secure}
                    onFocus={(e) => {
                        setFocused(true);
                        rest.onFocus?.(e);
                    }}
                    onBlur={(e) => {
                        setFocused(false);
                        rest.onBlur?.(e);
                    }}
                    {...rest}
                />

                {isPassword && (
                    <Pressable onPress={() => setSecure((s) => !s)} hitSlop={10}>
                        <Ionicons
                            name={secure ? "eye-off-outline" : "eye-outline"}
                            size={18}
                            color={Colors.textSecondary}
                        />
                    </Pressable>
                )}
            </View>

            {!!error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
}