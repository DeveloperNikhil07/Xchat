import Skeleton from "@/components/ui/Skeleton";
import { View } from "react-native";
import { styles } from "./ChatListSkelton.style";

export default function ChatListSkeleton({ count = 6 }: { count?: number }) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Skeleton width={100} height={22} radius={6} />
                <Skeleton width={60} height={16} radius={6} />
            </View>

            {Array.from({ length: count }).map((_, index) => (
                <View style={styles.chatRow} key={index}>
                    <Skeleton width={60} height={60} radius={30} />

                    <View style={styles.chatContent}>
                        <View style={styles.chatTop}>
                            <Skeleton width="45%" height={16} radius={6} />
                            <Skeleton width={30} height={12} radius={6} />
                        </View>

                        <View style={styles.chatBottom}>
                            <Skeleton width="65%" height={14} radius={6} />
                            <Skeleton width={20} height={20} radius={10} />
                        </View>
                    </View>
                </View>
            ))}
        </View>
    );
}