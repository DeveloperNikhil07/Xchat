import { Ionicons } from "@expo/vector-icons";
import { Image, Text, View } from "react-native";

import { styles } from "./Avatar.style";

interface Props {
    name: string;
    phone?: string;
    imageUri?: string | null;
    size?: number;
    online?: boolean;
}

export default function Avatar({
    name,
    phone,
    imageUri,
    size = 104,
    online = false,
}: Props) {
    return (
        <View style={styles.container}>
            <View
                style={[
                    styles.avatarWrapper,
                    {
                        width: size,
                        height: size,
                    },
                ]}
            >
                <View
                    style={[
                        styles.circle,
                        {
                            width: size,
                            height: size,
                            borderRadius: size / 2,
                        },
                    ]}
                >
                    {imageUri ? (
                        <Image
                            source={{ uri: imageUri }}
                            style={{
                                width: size,
                                height: size,
                                borderRadius: size / 2,
                            }}
                        />
                    ) : (
                        <Ionicons
                            name="person"
                            size={size * 0.42}
                            color="rgba(255,255,255,0.85)"
                        />
                    )}
                </View>

                {online && <View style={styles.onlineBadge} />}
            </View>

            <Text style={styles.name} numberOfLines={1}>
                {name}
            </Text>

            {phone && (
                <Text style={styles.phone}>
                    {phone}
                </Text>
            )}
        </View>
    );
}