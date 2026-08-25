// services/cloudinary.ts

const CLOUD_NAME = "dntldjiba";
const UPLOAD_PRESET = "neoxchat_upload";

export interface CloudinaryResponse {
    secure_url: string;
    public_id: string;
    resource_type: string;
    format: string;
    bytes: number;
    duration?: number;
    width?: number;
    height?: number;
}

export type CloudinaryUploadType =
    | "image"
    | "video"
    | "raw";

export const uploadToCloudinary = async (
    fileUri: string,
    type: CloudinaryUploadType = "image"
): Promise<CloudinaryResponse> => {
    try {
        console.log("📤 Uploading to Cloudinary...");
        console.log("Type:", type);

        const formData = new FormData();

        const uriParts = fileUri.split("/");
        const extractedName = uriParts[uriParts.length - 1] || "upload";
        const extension = extractedName.split(".").pop()?.toLowerCase();

        let mimeType = "application/octet-stream";
        let fileName = extractedName;

        if (type === "image") {
            mimeType = extension === "png" ? "image/png" : "image/jpeg";
            if (!fileName.includes(".")) fileName = "upload.jpg";
        } else if (type === "video") {
            mimeType = "video/mp4";
            if (!fileName.includes(".")) fileName = "upload.mp4";
        } else if (extension === "m4a") {
            mimeType = "audio/m4a";
        } else if (extension === "mp3") {
            mimeType = "audio/mpeg";
        } else if (extension === "pdf") {
            mimeType = "application/pdf";
        }

        formData.append(
            "file",
            {
                uri: fileUri,
                type: mimeType,
                name: fileName,
            } as any
        );

        formData.append(
            "upload_preset",
            UPLOAD_PRESET
        );

        const endpoint =
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${type}/upload`;

        const response = await fetch(endpoint, {
            method: "POST",
            body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
            console.log(
                "❌ Cloudinary upload failed:",
                data
            );

            throw new Error(
                data?.error?.message ||
                "Cloudinary upload failed"
            );
        }

        console.log(
            "☁️ Cloudinary URL:",
            data.secure_url
        );

        return data as CloudinaryResponse;

    } catch (error) {
        console.log(
            "❌ Cloudinary Error:",
            error
        );

        throw error;
    }
};