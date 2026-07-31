import React, {
    createContext,
    ReactNode,
    useEffect,
    useState,
} from "react";

import {
    User as FirebaseUser,
    onAuthStateChanged,
} from "firebase/auth";

import { auth } from "@/config/firebase";

import {
    login,
    logout,
    signup,
} from "@/services/auth.service";

import {
    getUserDocument,
} from "@/services/user.service";

import {
    AppUser,
    AuthContextType,
} from "@/types/auth/auth.types";

const AuthContext =
    createContext<AuthContextType | null>(null);

interface Props {
    children: ReactNode;
}

export const AuthProvider = ({
    children,
}: Props) => {
    const [firebaseUser, setFirebaseUser] =
        useState<FirebaseUser | null>(null);

    const [currentUser, setCurrentUser] =
        useState<AppUser | null>(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(
            auth,
            async (user) => {
                try {
                    setFirebaseUser(user);

                    if (user) {
                        const firestoreUser =
                            await getUserDocument(user.uid);

                        setCurrentUser(firestoreUser);
                    } else {
                        setCurrentUser(null);
                    }
                } catch (error) {
                    console.log(
                        "AuthContext Error:",
                        error
                    );
                    setCurrentUser(null);
                } finally {
                    setLoading(false);
                }
            }
        );

        return unsubscribe;
    }, []);

    const refreshUser = async () => {
        if (!firebaseUser) return;

        const user = await getUserDocument(
            firebaseUser.uid
        );

        setCurrentUser(user);
    };

    return (
        <AuthContext.Provider
            value={{
                firebaseUser,
                currentUser,
                loading,

                login: async (
                    email,
                    password
                ) => {
                    await login(email, password);
                },

                signup: async (
                    name,
                    email,
                    password,
                    phone
                ) => {
                      console.log("AuthContext signup");
                    await signup(
                        name,
                        email,
                        password,
                        phone
                    );
                },

                logout: async () => {
                    await logout();
                },

                googleLogin: async () => {
                    throw new Error(
                        "Google Login not implemented"
                    );
                },

                refreshUser,

                updateUser: async () => {
                    throw new Error(
                        "updateUser not implemented"
                    );
                },
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;