import Skeleton from "@/components/ui/Skeleton";
import { ScrollView, View } from "react-native";
import { styles } from "./RecentUsersSkeleton.style";

export default function RecentUsersSkeleton({ count = 5 }: { count?: number }) {
    return (
        <View style={{ height: 110, marginTop: 20 }}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.container}
            >
                {Array.from({ length: count }).map((_, index) => (
                    <View style={styles.user} key={index}>
                        <Skeleton width={72} height={72} radius={36} />
                        <Skeleton
                            width={40}
                            height={12}
                            radius={6}
                            style={{ marginTop: 10 }}
                        />
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}