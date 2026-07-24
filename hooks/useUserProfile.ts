import { fetchUserProfile, updateUserProfile, uploadAvatar } from "@/services/userService";
import { UpdatableUserProfile, UserProfile } from "@/types/users/user";
import { useCallback, useEffect, useState } from "react";

interface UseUserProfileResult {
    profile: UserProfile | null;
    loading: boolean;
    saving: boolean;
    error: string | null;
    refresh: () => Promise<void>;
    saveProfile: (updates: Partial<UpdatableUserProfile>) => Promise<boolean>;
    changeAvatar: (localUri: string) => Promise<boolean>;
}

export function useUserProfile(): UseUserProfileResult {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const load = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await fetchUserProfile();
            setProfile(data);
        } catch (e) {
            setError("Profile load nahi ho paya");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        load();
    }, [load]);

    const saveProfile = useCallback(
        async (updates: Partial<UpdatableUserProfile>) => {
            try {
                setSaving(true);
                const updated = await updateUserProfile(updates);
                setProfile(updated);
                return true;
            } catch (e) {
                setError("Profile save nahi ho paya");
                return false;
            } finally {
                setSaving(false);
            }
        },
        []
    );

    const changeAvatar = useCallback(async (localUri: string) => {
        try {
            setSaving(true);
            const url = await uploadAvatar(localUri);
            const updated = await updateUserProfile({ avatarUri: url });
            setProfile(updated);
            return true;
        } catch (e) {
            setError("Photo update nahi ho paya");
            return false;
        } finally {
            setSaving(false);
        }
    }, []);

    return { profile, loading, saving, error, refresh: load, saveProfile, changeAvatar };
}