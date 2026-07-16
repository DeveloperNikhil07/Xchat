import { Text, View } from "react-native";
import { styles } from "./DateSeparator.style";

interface DateSeparatorProps {
    label: string;
}

export default function DateSeparator({
    label,
}: DateSeparatorProps) {
    return (
        <View style={styles.container}>
            <View style={styles.line} />

            <View style={styles.badge}>
                <Text style={styles.text}>
                    {label}
                </Text>
            </View>

            <View style={styles.line} />
        </View>
    );
}