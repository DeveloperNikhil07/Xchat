import { Ionicons } from "@expo/vector-icons";
import {
    Image,
    Linking,
    Modal,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Colors } from "@/constants/theme";
import styles from "./ContactViewer.style";

interface ContactData {
    name: string;
    phoneNumbers: string[];
    emails?: string[];
    imageUri?: string | null;
}

interface Props {
    visible: boolean;
    contact: ContactData | null;
    onClose: () => void;
}

function getInitials(name: string) {
    const parts = name.trim().split(" ").filter(Boolean);

    if (parts.length === 0) return "?";
    if (parts.length === 1) return parts[0][0].toUpperCase();

    return (
        parts[0][0] +
        parts[parts.length - 1][0]
    ).toUpperCase();
}

export default function ContactViewer({
    visible,
    contact,
    onClose,
}: Props) {
    
    if (!contact) return null;

    return (
        <Modal
            visible={visible}
            animationType="slide"
            statusBarTranslucent
            onRequestClose={onClose}
        >
            <SafeAreaView
                style={styles.container}
                edges={["top"]}
            >
                {/* Header */}

                <View style={styles.header}>
                    <Pressable
                        style={styles.backButton}
                        onPress={onClose}
                    >
                        <Ionicons
                            name="arrow-back"
                            size={22}
                            color="#FFF"
                        />
                    </Pressable>

                    <Text style={styles.headerTitle}>
                        Contact Info
                    </Text>

                    <View style={{ width: 42 }} />
                </View>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.body}
                >
                    {/* Avatar */}

                    <View style={styles.profileSection}>
                        {contact.imageUri ? (
                            <Image
                                source={{
                                    uri: contact.imageUri,
                                }}
                                style={styles.avatar}
                            />
                        ) : (
                            <View
                                style={
                                    styles.avatarFallback
                                }
                            >
                                <Text
                                    style={
                                        styles.avatarInitials
                                    }
                                >
                                    {getInitials(
                                        contact.name
                                    )}
                                </Text>
                            </View>
                        )}

                        <Text style={styles.name}>
                            {contact.name}
                        </Text>
                    </View>

                    {/* Phone */}

                    {contact.phoneNumbers.length > 0 && (
                        <View style={styles.section}>
                            <Text
                                style={
                                    styles.sectionLabel
                                }
                            >
                                Phone
                            </Text>

                            <View
                                style={styles.card}
                            >
                                {contact.phoneNumbers.map(
                                    (
                                        phone,
                                        index
                                    ) => (
                                        <View
                                            key={`${phone}-${index}`}
                                            style={[
                                                styles.row,
                                                index ===
                                                contact
                                                    .phoneNumbers
                                                    .length -
                                                1 && {
                                                    borderBottomWidth: 0,
                                                },
                                            ]}
                                        >
                                            <View
                                                style={
                                                    styles.rowIcon
                                                }
                                            >
                                                <Ionicons
                                                    name="call"
                                                    size={
                                                        18
                                                    }
                                                    color={
                                                        Colors.brandPrimary
                                                    }
                                                />
                                            </View>

                                            <View
                                                style={
                                                    styles.rowContent
                                                }
                                            >
                                                <Text
                                                    style={
                                                        styles.rowTitle
                                                    }
                                                >
                                                    {
                                                        phone
                                                    }
                                                </Text>

                                                <Text
                                                    style={
                                                        styles.rowSubtitle
                                                    }
                                                >
                                                    Mobile
                                                </Text>
                                            </View>

                                            <View
                                                style={
                                                    styles.actions
                                                }
                                            >
                                                <Pressable
                                                    style={
                                                        styles.actionButton
                                                    }
                                                    onPress={() =>
                                                        Linking.openURL(
                                                            `tel:${phone}`
                                                        )
                                                    }
                                                >
                                                    <Ionicons
                                                        name="call"
                                                        size={
                                                            18
                                                        }
                                                        color="#FFF"
                                                    />
                                                </Pressable>

                                                <Pressable
                                                    style={[
                                                        styles.actionButton,
                                                        styles.secondaryButton,
                                                    ]}
                                                    onPress={() =>
                                                        Linking.openURL(
                                                            `sms:${phone}`
                                                        )
                                                    }
                                                >
                                                    <Ionicons
                                                        name="chatbubble"
                                                        size={
                                                            17
                                                        }
                                                        color={
                                                            Colors.brandPrimary
                                                        }
                                                    />
                                                </Pressable>
                                            </View>
                                        </View>
                                    )
                                )}
                            </View>
                        </View>
                    )}

                    {/* Email */}

                    {!!contact.emails?.length && (
                        <View style={styles.section}>
                            <Text
                                style={
                                    styles.sectionLabel
                                }
                            >
                                Email
                            </Text>

                            <View
                                style={styles.card}
                            >
                                {contact.emails.map(
                                    (
                                        email,
                                        index
                                    ) => (
                                        <View
                                            key={
                                                email
                                            }
                                            style={[
                                                styles.row,
                                                index ===
                                                contact
                                                    .emails!
                                                    .length -
                                                1 && {
                                                    borderBottomWidth: 0,
                                                },
                                            ]}
                                        >
                                            <View
                                                style={
                                                    styles.rowIcon
                                                }
                                            >
                                                <Ionicons
                                                    name="mail"
                                                    size={
                                                        18
                                                    }
                                                    color={
                                                        Colors.brandPrimary
                                                    }
                                                />
                                            </View>

                                            <View
                                                style={
                                                    styles.rowContent
                                                }
                                            >
                                                <Text
                                                    numberOfLines={
                                                        1
                                                    }
                                                    style={
                                                        styles.rowTitle
                                                    }
                                                >
                                                    {
                                                        email
                                                    }
                                                </Text>

                                                <Text
                                                    style={
                                                        styles.rowSubtitle
                                                    }
                                                >
                                                    Email
                                                </Text>
                                            </View>

                                            <Pressable
                                                style={
                                                    styles.actionButton
                                                }
                                                onPress={() =>
                                                    Linking.openURL(
                                                        `mailto:${email}`
                                                    )
                                                }
                                            >
                                                <Ionicons
                                                    name="mail"
                                                    size={
                                                        18
                                                    }
                                                    color="#FFF"
                                                />
                                            </Pressable>
                                        </View>
                                    )
                                )}
                            </View>
                        </View>
                    )}
                </ScrollView>
            </SafeAreaView>
        </Modal>
    );
}