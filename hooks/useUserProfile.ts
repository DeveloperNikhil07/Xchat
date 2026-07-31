import { useAuth } from "@/hooks/useAuth";
import { uploadToCloudinary } from "@/services/cloudinary";
import {
    UpdateUserPayload,
    updateUserDocument,
} from "@/services/user.service";
import { useState } from "react";
import { Alert } from "react-native";

export const useUserProfile = () => {
    const { currentUser, firebaseUser, loading, refreshUser } = useAuth();

    const [saving, setSaving] = useState(false);
    const [uploadingAvatar, setUploadingAvatar] = useState(false);

    const saveProfile = async (
        data: UpdateUserPayload
    ): Promise<boolean> => {
        if (!firebaseUser) return false;

        try {
            setSaving(true);

            await updateUserDocument(firebaseUser.uid, data);
            await refreshUser();

            return true;
        } catch (error: any) {
            console.log("saveProfile Error:", error);
            Alert.alert(
                "Error",
                error.message || "Failed to save profile."
            );
            return false;
        } finally {
            setSaving(false);
        }
    };

    const changeAvatar = async (fileUri: string): Promise<boolean> => {
        if (!firebaseUser) return false;

        try {
            setUploadingAvatar(true);

            const result = await uploadToCloudinary(fileUri, "image");

            await updateUserDocument(firebaseUser.uid, {
                photoURL: result.secure_url,
            });

            await refreshUser();

            return true;
        } catch (error) {
            console.log("changeAvatar Error:", error);
            Alert.alert("Error", "Failed to update profile photo.");
            return false;
        } finally {
            setUploadingAvatar(false);
        }
    };

    return {
        profile: currentUser,
        loading,
        saving,
        uploadingAvatar,
        saveProfile,
        changeAvatar,
    };
};