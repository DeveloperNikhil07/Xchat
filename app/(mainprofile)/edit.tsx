import Header from "@/components/common/Header";
import ProfileAvatar from "@/components/mainProfile/ProfileAvatar";
import { Colors } from "@/constants/theme";
import { useUserProfile } from "@/hooks/useUserProfile";
import { styles } from "@/styles/EditProfile.style";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";

export default function EditProfileScreen() {
    const {
        profile,
        loading,
        saving,
        saveProfile,
        changeAvatar,
    } = useUserProfile();

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        if (!profile) return;

        setName(profile.name);
        setUsername(profile.username);
        setBio(profile.bio);
        setPhone(profile.phone);
        setEmail(profile.email);
    }, [profile]);

    const handleAvatarEdit = async () => {
        // TODO:
        // Pick image then
        // await changeAvatar(uri);
    };

    const handleSave = async () => {
        const success = await saveProfile({
            name,
            username,
            bio,
            phone,
            email,
        });

        if (success) {
            router.back();
        }
    };

    if (loading || !profile) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator
                    size="large"
                    color={Colors.brandPrimary}
                />
            </View>
        );
    }

    return (
        <LinearGradient
            colors={[
                "#07111A",
                "#0C1823",
                "#122434",
                "#08121A",
            ]}
            style={styles.container}
        >
            <Header
                title="Edit Profile"
                onBack={() => router.back()}
                iconColor={Colors.textOnDark}
            />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >

                {/* Avatar */}

                <View style={styles.avatarSection}>

                    <View style={styles.avatarWrapper}>

                        <ProfileAvatar
                            imageUri={profile.avatarUri}
                            editable
                            onEditPress={handleAvatarEdit}
                        />

                        <Pressable
                            style={styles.cameraButton}
                            onPress={handleAvatarEdit}
                        >
                            <Feather
                                name="camera"
                                color="#fff"
                                size={18}
                            />
                        </Pressable>

                    </View>

                    <Text style={styles.changePhoto}>
                        Change Profile Photo
                    </Text>

                </View>

                {/* Profile */}

                <View style={styles.card}>

                    <Text style={styles.cardTitle}>
                        Profile
                    </Text>

                    <Field
                        icon={
                            <Feather
                                name="user"
                                size={18}
                                color={Colors.brandPrimary}
                            />
                        }
                        label="Full Name"
                        value={name}
                        onChangeText={setName}
                    />

                    <Field
                        icon={
                            <Feather
                                name="at-sign"
                                size={18}
                                color={Colors.brandPrimary}
                            />
                        }
                        label="Username"
                        value={username}
                        onChangeText={setUsername}
                        autoCapitalize="none"
                    />

                </View>

                {/* About */}

                <View style={styles.card}>

                    <Text style={styles.cardTitle}>
                        About
                    </Text>

                    <Field
                        icon={
                            <MaterialCommunityIcons
                                name="text-box-outline"
                                size={18}
                                color={Colors.brandPrimary}
                            />
                        }
                        label="Bio"
                        value={bio}
                        onChangeText={setBio}
                        multiline
                    />

                </View>

                {/* Contact */}

                <View style={styles.card}>

                    <Text style={styles.cardTitle}>
                        Contact
                    </Text>

                    <Field
                        icon={
                            <Feather
                                name="phone"
                                size={18}
                                color={Colors.brandPrimary}
                            />
                        }
                        label="Phone"
                        value={phone}
                        onChangeText={setPhone}
                        keyboardType="phone-pad"
                    />

                    <Field
                        icon={
                            <Ionicons
                                name="mail-outline"
                                size={18}
                                color={Colors.brandPrimary}
                            />
                        }
                        label="Email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                </View>

                <Pressable
                    style={styles.saveButton}
                    disabled={saving}
                    onPress={handleSave}
                >
                    {saving ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.saveButtonText}>
                            Save Changes
                        </Text>
                    )}
                </Pressable>

            </ScrollView>

        </LinearGradient>
    );
}

type FieldProps = {
    icon: React.ReactNode;
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    multiline?: boolean;
    keyboardType?: "default" | "phone-pad" | "email-address";
    autoCapitalize?: "none" | "sentences";
};

function Field({
    icon,
    label,
    value,
    onChangeText,
    multiline = false,
    keyboardType = "default",
    autoCapitalize = "sentences",
}: FieldProps) {

    return (

        <View style={styles.field}>

            <View style={styles.fieldHeader}>

                {icon}

                <Text style={styles.label}>
                    {label}
                </Text>

            </View>

            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={label}
                placeholderTextColor="rgba(255,255,255,.35)"
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
                multiline={multiline}
                style={[
                    styles.input,
                    multiline && styles.bioInput,
                ]}
            />

        </View>

    );
}