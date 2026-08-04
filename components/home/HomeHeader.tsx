import Colors from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./HomeHeader.style";

interface HomeHeaderProps {
    userName: string;
    greeting?: string;
}

export default function HomeHeader({
    userName,
    greeting,
}: HomeHeaderProps) {
    const router = useRouter();

    const getGreeting = () => {
        const hour = new Date().getHours();

        if (hour >= 5 && hour < 12) {
            return "Good Morning 👋";
        } else if (hour >= 12 && hour < 17) {
            return "Good Afternoon ☀️";
        } else if (hour >= 17 && hour < 21) {
            return "Good Evening 🌇";
        } else {
            return "Good Night 🌙";
        }
    };

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>
                    {greeting ?? getGreeting()}
                </Text>
                <Text style={styles.name}>{userName}</Text>
            </View>

            <View style={styles.actions}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.iconButton}
                    onPress={() => router.push("/(mainprofile)/me")}
                >
                    <Ionicons
                        name="grid-outline"
                        size={22}
                        color={Colors.textOnDark}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}