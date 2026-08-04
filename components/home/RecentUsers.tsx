import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { RecentUser } from "@/types/chat/recentUser.types";
import RecentUserCard from "./RecentUserCard";
import { styles } from "./RecentUsers.style";
interface Props {
    users: RecentUser[];
}

export default function RecentUsers({
    users,
}: Props) {
    const data = [
        {
            uid: "new",
            displayName: "New",
            photoURL: "",
            isOnline: false,
            username: "",
            lastSeen: 0,
            isAdd: true,
        },
        ...users,
    ];

    return (

        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>
                    🔥 Recent
                </Text>
                <TouchableOpacity>
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
                        name={
                            item.displayName
                        }
                        image={
                            item.photoURL
                        }
                        online={
                            item.isOnline
                        }
                        isAdd={
                            (item as any).isAdd
                        }
                    />
                )}
            />
        </View>
    );
}