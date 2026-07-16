import { FlatList, Text, TouchableOpacity, View } from "react-native";
import RecentUserCard from "./RecentUserCard";
import { styles } from "./RecentUsers.style";

const users = [
  {
    id: "0",
    name: "New",
    image: null,
    online: false,
    isAdd: true,
  },
  {
    id: "1",
    name: "Alex",
    image: require("@/assets/images/man.png"),
    online: true,
  },
  {
    id: "2",
    name: "Emma",
    image: require("@/assets/images/man.png"),
    online: true,
  },
  {
    id: "3",
    name: "John",
    image: require("@/assets/images/man.png"),
    online: false,
  },
  {
    id: "4",
    name: "Sarah",
    image: require("@/assets/images/man.png"),
    online: true,
  },
];

export default function RecentUsers() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🔥 Recent</Text>

        <TouchableOpacity activeOpacity={0.7}>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal
        data={users}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <RecentUserCard {...item} />
        )}
      />
    </View>
  );
}