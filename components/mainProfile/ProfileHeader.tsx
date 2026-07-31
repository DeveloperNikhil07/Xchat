import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";

import ProfileAvatar from "./ProfileAvatar";
import { styles } from "./ProfileHeader.style";

interface Props {
    name: string;
    username: string;
    bio: string;
    avatarUri: string | null;
    onEditAvatarPress?: () => void;
    isUploading?: boolean;
}

export default function ProfileHeader({
    name,
    username,
    bio,
    avatarUri,
    onEditAvatarPress,
    isUploading = false,
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
                    isUploading={isUploading}
                />
            </View>

            <Text
                style={styles.name}
                numberOfLines={1}
            >
                {name}
            </Text>

            {!!bio && (
                <Text
                    style={styles.bio}
                    numberOfLines={3}
                >
                    {bio}
                </Text>
            )}

        </LinearGradient>
    );
}