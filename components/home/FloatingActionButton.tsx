import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { styles } from "./FloatingActionButton.style";

interface Props {
    onPress: () => void;
}

export default function FloatingActionButton({
    onPress,
}: Props) {
    return (
        <TouchableOpacity
            activeOpacity={0.85}
            style={styles.container}
            onPress={onPress}
        >
            <Ionicons
                name="add"
                size={30}
                color="#FFFFFF"
            />
        </TouchableOpacity>
    );
}