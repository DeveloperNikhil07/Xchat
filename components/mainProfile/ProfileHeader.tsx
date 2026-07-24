import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, Text, View } from "react-native";

import ProfileAvatar from "./ProfileAvatar";
import { styles } from "./ProfileHeader.style";

interface Props {
    name: string;
    username: string;
    bio: string;
    avatarUri: string | null;
    onEditAvatarPress?: () => void;
    onEditProfilePress?: () => void;
}

export default function ProfileHeader({
    name,
    username,
    bio,
    avatarUri,
    onEditAvatarPress,
    onEditProfilePress,
}: Props) {
    return (
        <LinearGradient
            colors={[
                "#07111A",
                "#0C1823",
                "#122434",
                "#08121A",
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
        >
            <View style={styles.avatarWrapper}>
                <ProfileAvatar
                    imageUri={avatarUri}
                    editable
                    onEditPress={onEditAvatarPress}
                />
            </View>

            <Text
                style={styles.name}
                numberOfLines={1}
            >
                {name}
            </Text>

            <Text style={styles.username}>
                @{username}
            </Text>

            {!!bio && (
                <Text
                    style={styles.bio}
                    numberOfLines={3}
                >
                    {bio}
                </Text>
            )}

            <Pressable
                style={styles.editButton}
                onPress={onEditProfilePress}
            >
                <Feather
                    name="edit-2"
                    size={16}
                    color="#FFF"
                />

                <Text style={styles.editText}>
                    Edit Profile
                </Text>
            </Pressable>
        </LinearGradient>
    );
}