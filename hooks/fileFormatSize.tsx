export const formatSize = (size?: number) => {
        if (!size) return "";

        if (size >= 1024 * 1024) {
            return `${(size / (1024 * 1024)).toFixed(1)} MB`;
        }

        return `${(size / 1024).toFixed(1)} KB`;
    };