import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
    FlatList,
    Modal,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { inviteViaWhatsApp } from "@/services/invite.service";
import {
    isSearchTextPhoneNumber,
    searchUsers,
} from "@/services/search.service";

import SearchBar from "@/components/ui/SearchBar";
import SearchUserCard from "./SearchUserCard";
import { styles } from "./SearchUserModal.style";

interface UserItem {
    uid: string;
    displayName?: string;
    username: string;
    photoURL?: string;
    isOnline?: boolean;
}

interface Props {
    visible: boolean;
    onClose: () => void;
    currentUser: {
        uid: string;
    };
    onAdd: (user: UserItem) => void;
}

export default function SearchUserModal({
    visible,
    onClose,
    currentUser,
    onAdd,
}: Props) {
    const [keyword, setKeyword] = useState("");
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState<UserItem[]>([]);
    const [searched, setSearched] = useState(false);

    useEffect(() => {
        if (!visible) {
            setKeyword("");
            setUsers([]);
            setSearched(false);
        }
    }, [visible]);

    useEffect(() => {
        const timer = setTimeout(async () => {
            if (!keyword.trim()) {
                setUsers([]);
                setSearched(false);
                return;
            }

            try {
                setLoading(true);

                const result = await searchUsers(keyword.trim());

                const filtered = result.filter(
                    (user) => user.uid !== currentUser.uid
                );

                setUsers(filtered);
                setSearched(true);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }, 400);

        return () => clearTimeout(timer);
    }, [keyword, currentUser.uid]);

    const showInvite =
        searched &&
        !loading &&
        users.length === 0 &&
        keyword.trim().length > 0;

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <View style={styles.handle} />

                    <View style={styles.header}>
                        <Text style={styles.title}>
                            Start New Chat
                        </Text>

                        <TouchableOpacity
                            onPress={onClose}
                            style={styles.closeBtn}
                        >
                            <Ionicons
                                name="close"
                                size={20}
                                color="#fff"
                            />
                        </TouchableOpacity>
                    </View>

                    <SearchBar
                        value={keyword}
                        onChangeText={setKeyword}
                        placeholder="Search by username or phone..."
                    />

                    {loading ? (
                        <View style={styles.empty}>
                            <Text style={styles.emptyText}>
                                Searching...
                            </Text>
                        </View>
                    ) : users.length === 0 ? (
                        <View style={styles.empty}>
                            {showInvite ? (
                                <View style={styles.inviteBox}>
                                    <View style={styles.inviteIconWrap}>
                                        <Ionicons
                                            name="person-add"
                                            size={26}
                                            color="#20A090"
                                        />
                                    </View>

                                    <Text style={styles.inviteTitle}>
                                        User not on XChat
                                    </Text>

                                    <Text style={styles.inviteSubtitle}>
                                        "{keyword}" abhi XChat use nahi
                                        karta. Unhe WhatsApp pe invite
                                        bhej do.
                                    </Text>

                                    <TouchableOpacity
                                        style={styles.inviteButton}
                                        onPress={() =>
                                            inviteViaWhatsApp(
                                                isSearchTextPhoneNumber(
                                                    keyword.trim()
                                                )
                                                    ? keyword.trim()
                                                    : undefined
                                            )
                                        }
                                    >
                                        <Ionicons
                                            name="logo-whatsapp"
                                            size={20}
                                            color="#fff"
                                        />

                                        <Text style={styles.inviteButtonText}>
                                            Invite via WhatsApp
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <>
                                    <Text style={styles.emptyEmoji}>
                                        🔍
                                    </Text>

                                    <Text style={styles.emptyText}>
                                        {keyword
                                            ? "No user found"
                                            : "Search people to chat"}
                                    </Text>
                                </>
                            )}
                        </View>
                    ) : (
                        <FlatList
                            data={users}
                            keyExtractor={(item) => item.uid}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{
                                paddingTop: 20,
                                paddingBottom: 40,
                            }}
                            renderItem={({ item }) => (
                                <SearchUserCard
                                    uid={item.uid}
                                    currentUserId={currentUser.uid}
                                    name={
                                        item.displayName || item.username
                                    }
                                    username={item.username}
                                    photoURL={item.photoURL}
                                    isOnline={item.isOnline}
                                    onMessage={() => onAdd(item)}
                                />
                            )}
                        />
                    )}
                </View>
            </View>
        </Modal>
    );
}