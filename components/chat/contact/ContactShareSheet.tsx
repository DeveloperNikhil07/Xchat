import { Ionicons } from "@expo/vector-icons";
import * as Contacts from "expo-contacts";
import { useEffect, useMemo, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Image,
    Modal,
    Pressable,
    Text,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Colors } from "@/constants/theme";
import styles from "./ContactShareSheet.style";

export interface PickedContact {
    name: string;
    phoneNumbers: string[];
    emails?: string[];
    imageUri?: string | null;
}

interface Props {
    visible: boolean;
    onClose: () => void;
    onPick: (contact: PickedContact) => void;
}

function getInitials(name: string) {
    const parts = name.trim().split(" ").filter(Boolean);
    if (parts.length === 0) return "?";
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function ContactShareSheet({ visible, onClose, onPick }: Props) {
    const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [search, setSearch] = useState("");

    useEffect(() => {
        if (!visible) {
            setSearch("");
            return;
        }

        let cancelled = false;

        (async () => {
            setLoading(true);
            setErrorMsg(null);

            const permission = await Contacts.requestPermissionsAsync();
            if (!permission.granted) {
                setErrorMsg("Contacts permission denied");
                setLoading(false);
                return;
            }

            const { data } = await Contacts.getContactsAsync({
                fields: [
                    Contacts.Fields.PhoneNumbers,
                    Contacts.Fields.Emails,
                    Contacts.Fields.Image,
                ],
                sort: Contacts.SortTypes.FirstName,
            });

            if (cancelled) return;

            console.log("Total contacts from device:", data.length);

            const usable = data.filter(
                (c) => (c.name || c.firstName || c.lastName) && c.phoneNumbers && c.phoneNumbers.length > 0
            );

            console.log("Usable contacts after filter:", usable.length);

            setContacts(usable);
            setLoading(false);
        })();

        return () => {
            cancelled = true;
        };
    }, [visible]);

    const filtered = useMemo(() => {
        if (!search.trim()) return contacts;
        const q = search.trim().toLowerCase();
        return contacts.filter((c) => c.name?.toLowerCase().includes(q));
    }, [contacts, search]);

    const handlePick = (item: Contacts.Contact) => {
        onPick({
            name: item.name || "Unknown",
            phoneNumbers: [
                ...new Set(
                    (item.phoneNumbers || [])
                        .map((p) => (p.number ?? "").trim())
                        .filter(Boolean)
                ),
            ],
            emails: (item.emails || []).map((e) => e.email || "").filter(Boolean),
            imageUri: item.imageAvailable ? item.image?.uri : null,
        });
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent
            onRequestClose={onClose}
            statusBarTranslucent
        >
            <Pressable style={styles.backdrop} onPress={onClose} />

            <View style={styles.sheet}>
                <View style={styles.solidBg}>
                    <SafeAreaView edges={["bottom"]} style={{ flex: 1 }}>
                        <View style={styles.handle} />

                        <View style={styles.header}>
                            <Text style={styles.headerTitle}>Contact Share Karein</Text>
                            <Pressable style={styles.closeButton} onPress={onClose} hitSlop={8}>
                                <Ionicons name="close" size={20} color={Colors.textOnDark} />
                            </Pressable>
                        </View>

                        <View style={styles.searchBox}>
                            <Ionicons name="search" size={16} color="rgba(255,255,255,0.5)" />
                            <TextInput
                                value={search}
                                onChangeText={setSearch}
                                placeholder="Search contacts..."
                                placeholderTextColor="rgba(255,255,255,0.4)"
                                style={styles.searchInput}
                            />
                        </View>

                        <View style={styles.listWrapper}>
                            {loading && (
                                <View style={styles.centerBox}>
                                    <ActivityIndicator size="large" color={Colors.brandLight} />
                                    <Text style={styles.hintText}>Contacts load ho rahe hain...</Text>
                                </View>
                            )}

                            {!loading && errorMsg && (
                                <View style={styles.centerBox}>
                                    <Ionicons name="person-outline" size={36} color="rgba(255,255,255,0.5)" />
                                    <Text style={styles.hintText}>{errorMsg}</Text>
                                </View>
                            )}

                            {!loading && !errorMsg && (
                                <FlatList
                                    data={filtered}
                                    keyExtractor={(item, index) => (item as { id?: string }).id ?? item.name ?? `contact-${index}`}
                                    keyboardShouldPersistTaps="handled"
                                    showsVerticalScrollIndicator={false}
                                    contentContainerStyle={{ paddingBottom: 20 }}
                                    ListEmptyComponent={
                                        <View style={styles.centerBox}>
                                            <Text style={styles.hintText}>Koi contact nahi mila</Text>
                                        </View>
                                    }
                                    renderItem={({ item }) => (
                                        <Pressable style={styles.contactRow} onPress={() => handlePick(item)}>
                                            {item.imageAvailable && item.image?.uri ? (
                                                <Image source={{ uri: item.image.uri }} style={styles.contactAvatar} />
                                            ) : (
                                                <View style={styles.contactAvatarFallback}>
                                                    <Text style={styles.contactInitials}>
                                                        {getInitials(item.name || "?")}
                                                    </Text>
                                                </View>
                                            )}

                                            <View style={{ flex: 1, marginLeft: 12 }}>
                                                <Text style={styles.contactName} numberOfLines={1}>
                                                    {item.name}
                                                </Text>
                                                <Text style={styles.contactSubtitle} numberOfLines={1}>
                                                    {item.phoneNumbers?.[0]?.number || ""}
                                                </Text>
                                            </View>
                                        </Pressable>
                                    )}
                                />
                            )}
                        </View>
                    </SafeAreaView>
                </View>
            </View>
        </Modal>
    );
}