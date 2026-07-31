import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

export const pickImage = async (): Promise<string | null> => {
    try {
        const permission =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permission.granted) {
            Alert.alert(
                "Permission Required",
                "Please allow gallery access to change your photo."
            );
            return null;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (result.canceled || !result.assets?.length) {
            return null;
        }

        return result.assets[0].uri;
    } catch (error) {
        console.log("pickImage Error:", error);
        Alert.alert("Error", "Failed to open gallery.");
        return null;
    }
};