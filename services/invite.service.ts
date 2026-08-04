import { Alert, Linking, Share } from "react-native";

// Apna actual app link/store link jab ready ho to yaha daal dena
const APP_INVITE_LINK = "https://xchat.app/download";

export const inviteViaWhatsApp = async (phone?: string) => {
    const message = encodeURIComponent(
        `Hey! Main XChat use kar raha hoon 👋 Tum bhi aa jao, chat karte hain: ${APP_INVITE_LINK}`
    );

    const cleanPhone = phone ? phone.replace(/[^0-9]/g, "") : "";

    const url = cleanPhone
        ? `https://wa.me/${cleanPhone}?text=${message}`
        : `https://wa.me/?text=${message}`;

    try {
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            await Linking.openURL(url);
            return;
        }

        // WhatsApp installed na ho to native share sheet khol do
        await Share.share({ message: decodeURIComponent(message) });
    } catch (error) {
        console.log("Invite Error:", error);
        Alert.alert("Error", "Unable to open WhatsApp.");
    }
};