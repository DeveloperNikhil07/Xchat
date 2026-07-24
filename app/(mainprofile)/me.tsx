import Header from "@/components/common/Header";
import ProfileHeader from "@/components/mainProfile/ProfileHeader";
import InfoCard from "@/components/profile/InfoCard";
import InfoRow from "@/components/profile/InfoRow";
import { Colors } from "@/constants/theme";
import { useUserProfile } from "@/hooks/useUserProfile";
import { router } from "expo-router";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { styles } from '../../styles/MyProfile.style';
export default function MyProfileScreen() {
    const { profile, loading, changeAvatar } = useUserProfile();

    const handleAvatarEdit = async () => {
        // TODO: expo-image-picker se photo pick karke changeAvatar(uri) call karna
        // ye already location/document pickers me pattern use kiya hai, wahi copy kar lena
    };

    if (loading || !profile) {
        return (
            <View style={{ flex: 1, backgroundColor: Colors.background, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color={Colors.brandPrimary} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Header
                title="Profile"
                onBack={() => router.back()}
                iconColor="#FFF"
                rightIcon="pencil"
                onRightPress={() => router.push("/(mainprofile)/edit")}
            />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >
                <ProfileHeader
                    name={profile.name}
                    username={profile.username}
                    bio={profile.bio}
                    avatarUri={profile.avatarUri}
                    onEditAvatarPress={handleAvatarEdit}
                />

                <View style={styles.section}>
                    <InfoCard title="Personal">
                        <InfoRow
                            icon="call"
                            label={profile.phone}
                            onPress={() => router.push("/(mainprofile)/edit")}
                        />

                        <InfoRow
                            icon="mail"
                            label={profile.email}
                            showDivider={false}
                            onPress={() => router.push("/(mainprofile)/edit")}
                        />
                    </InfoCard>

                    <InfoCard title="Preferences">
                        <InfoRow
                            icon="notifications"
                            label="Notifications"
                            onPress={() => { }}
                        />

                        <InfoRow
                            icon="shield-checkmark"
                            label="Privacy"
                            onPress={() => { }}
                        />

                        <InfoRow
                            icon="color-palette"
                            label="Appearance"
                            showDivider={false}
                            onPress={() => { }}
                        />
                    </InfoCard>

                    <InfoCard title="Account">
                        <InfoRow
                            icon="log-out"
                            label="Logout"
                            danger
                            showDivider={false}
                            showChevron={false}
                            onPress={() => { }}
                        />
                    </InfoCard>
                </View>
            </ScrollView>
        </View>
    );
}