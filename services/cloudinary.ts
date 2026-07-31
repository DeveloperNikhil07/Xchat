const CLOUD_NAME = "dntldjiba";
const UPLOAD_PRESET = "neoxchat_upload";

export interface CloudinaryResponse {
    secure_url: string;
    public_id: string;
    resource_type: string;
    format: string;
    bytes: number;
}

export const uploadToCloudinary = async (
    fileUri: string,
    type: "image" | "video" | "raw" = "image"
): Promise<CloudinaryResponse> => {
    try {
        const formData = new FormData();

        formData.append("file", {
            uri: fileUri,
            type:
                type === "image"
                    ? "image/jpeg"
                    : type === "video"
                        ? "video/mp4"
                        : "application/octet-stream",
            name:
                type === "image"
                    ? "upload.jpg"
                    : type === "video"
                        ? "upload.mp4"
                        : "upload",
        } as any);

        formData.append("upload_preset", UPLOAD_PRESET);

        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${type}/upload`,
            {
                method: "POST",
                body: formData,
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error?.message || "Upload failed");
        }

        return data as CloudinaryResponse;
    } catch (error) {
        console.log("Cloudinary Error:", error);
        throw error;
    }
};