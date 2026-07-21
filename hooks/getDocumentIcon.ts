export const getFileInfo = (fileName: string) => {
    const ext = fileName.split(".").pop()?.toLowerCase() || "";

    switch (ext) {
        case "pdf":
            return {
                icon: "document-text",
                badge: "PDF",
                color: "#E53935",
                bg: "#FDECEC",
            };

        case "doc":
        case "docx":
            return {
                icon: "document",
                badge: "DOC",
                color: "#1565C0",
                bg: "#EAF2FD",
            };

        case "xls":
        case "xlsx":
        case "csv":
            return {
                icon: "grid",
                badge: "XLS",
                color: "#2E7D32",
                bg: "#EAF8EE",
            };

        case "ppt":
        case "pptx":
            return {
                icon: "easel",
                badge: "PPT",
                color: "#EF6C00",
                bg: "#FFF3E8",
            };

        case "zip":
        case "rar":
        case "7z":
            return {
                icon: "archive",
                badge: "ZIP",
                color: "#6D4C41",
                bg: "#F4EFEA",
            };

        case "mp3":
        case "wav":
        case "aac":
            return {
                icon: "musical-notes",
                badge: "AUDIO",
                color: "#8E24AA",
                bg: "#F5EAFE",
            };

        case "mp4":
        case "mov":
        case "avi":
            return {
                icon: "videocam",
                badge: "VIDEO",
                color: "#D81B60",
                bg: "#FCE7F0",
            };

        case "jpg":
        case "jpeg":
        case "png":
        case "webp":
            return {
                icon: "image",
                badge: "IMAGE",
                color: "#00897B",
                bg: "#E7F8F5",
            };

        default:
            return {
                icon: "document",
                badge: ext.toUpperCase() || "FILE",
                color: "#20A090",
                bg: "#EEF9F7",
            };
    }
};