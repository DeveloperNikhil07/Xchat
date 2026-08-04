import { AuthProvider } from "@/context/AuthContext";
import React from "react";

export default function AppProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    );
}