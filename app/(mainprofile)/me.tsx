import Header from "@/components/common/Header";
import ProfileHeader from "@/components/mainProfile/ProfileHeader";
import InfoCard from "@/components/profile/InfoCard";
import InfoRow from "@/components/profile/InfoRow";
import { Colors } from "@/constants/theme";
import { useAuth } from "@/hooks/useAuth";
import { useUserProfile } from "@/hooks/useUserProfile";
import { pickImage } from "@/services/imagePicker.service";
import { router } from "expo-router";
import {
    ActivityIndicator,
    ScrollView,
    View,
} from "react-native";

import { useState } from "react";
import { styles } from "../../styles/MyProfile.style";

export default function MyProfileScreen() {
    const [logoutLoading, setLogoutLoading] = useState(false);
    const { currentUser, loading, logout } = useAuth();
    const { changeAvatar, uploadingAvatar } = useUserProfile();

    const handleAvatarEdit = async () => {
        const uri = await pickImage();
        if (!uri) return;

        await changeAvatar(uri);
    };

    const handleLogout = async () => {
        try {
            setLogoutLoading(true);

            await logout();

            router.replace("/(auth)/login");

        } catch (error) {
            console.log("Logout Error:", error);

        } finally {
            setLogoutLoading(false);
        }
    };
    if (loading || !currentUser) {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: Colors.background,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ActivityIndicator
                    size="large"
                    color={Colors.brandPrimary}
                />
            </View>
        );
    }
    if (loading || logoutLoading || !currentUser) {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: Colors.background,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ActivityIndicator
                    size="large"
                    color={Colors.brandPrimary}
                />
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <Header
                title={currentUser?.username || ''}
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
                    name={currentUser.displayName}
                    username={currentUser.username}
                    bio={currentUser.bio}
                    avatarUri={currentUser.photoURL}
                    onEditAvatarPress={handleAvatarEdit}
                />

                <View style={styles.section}>
                    <InfoCard title="Personal">
                        <InfoRow
                            icon="call"
                            label={currentUser.phone || "Not Added"}
                            onPress={() => router.push("/(mainprofile)/edit")}
                        />

                        <InfoRow
                            icon="mail"
                            label={currentUser.email}
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
                            onPress={handleLogout}
                        />
                    </InfoCard>
                </View>
            </ScrollView>
        </View>
    );
}