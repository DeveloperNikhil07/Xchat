import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, Text, View } from "react-native";

import { styles } from "./ProfileHero.style";

interface Props {
    image?: string;
    name: string;
    phone: string;
    online?: boolean;

    onAvatarPress?: () => void;
}

export default function ProfileHero({
    image,
    name,
    phone,
    online = true,
    onAvatarPress,
}: Props) {
    return (
        <View style={styles.container}>

            <Pressable
                onPress={onAvatarPress}
                android_ripple={{
                    color: "rgba(255,255,255,.12)",
                    borderless: true,
                }}
            >
                <View style={styles.avatarWrapper}>

                    <Image
                        source={
                            image
                                ? { uri: image }
                                : require("@/assets/images/man.png")
                        }
                        style={styles.avatar}
                    />

                    {online && (
                        <View style={styles.onlineDot} />
                    )}

                    <View style={styles.cameraButton}>
                        <Ionicons
                            name="camera"
                            size={18}
                            color="#FFF"
                        />
                    </View>

                </View>
            </Pressable>

            <Text style={styles.name}>
                {name}
            </Text>

            <Text style={styles.phone}>
                {phone}
            </Text>

        </View>
    );
}