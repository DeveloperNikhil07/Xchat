import {
    FlatList,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { RecentUser } from "@/types/chat/recentUser.types";
import { useRouter } from "expo-router";
import RecentUserCard from "./RecentUserCard";
import { styles } from "./RecentUsers.style";
interface Props {
    users: RecentUser[];
}

export default function RecentUsers({
    users,
}: Props) {
    const router = useRouter();
    const data = users;

    if (data.length < 2) {
        return null;
    }
    return (

        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>
                    🔥 Recent
                </Text>
                <TouchableOpacity onPress={() => router.push("/(chat)")}>
                    <Text style={styles.seeAll}>
                        See All
                    </Text>
                </TouchableOpacity>
            </View>

            <FlatList
                horizontal
                data={data}
                keyExtractor={(item) => item.uid}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={
                    styles.list
                }
                renderItem={({ item }) => (
                    <RecentUserCard
                        name={item.displayName}
                        image={item.photoURL}
                        online={item.isOnline}
                        onPress={() => {
                            if ((item as any).isAdd) {
                                return;
                            }

                            router.push({
                                pathname: "/(chat)/[chatId]",
                                params: {
                                    chatId: item.chatId,
                                    name: item.displayName,
                                    avatar: item.photoURL || "",
                                    type: "chat",
                                },
                            });
                        }}
                    />
                )}
            />
        </View>
    );
}