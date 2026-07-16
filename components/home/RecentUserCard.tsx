import { Ionicons } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./RecentUserCard.style";

interface Props {
  name: string;
  image: any;
  online?: boolean;
  isAdd?: boolean;
  onPress?: () => void;
}

export default function RecentUserCard({
  name,
  image,
  online = false,
  isAdd = false,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.container}
      onPress={onPress}
    >
      {isAdd ? (
        <View style={styles.addAvatar}>
          <Ionicons
            name="add"
            size={32}
            color="#fff"
          />
        </View>
      ) : (
        <View style={styles.avatarWrapper}>
          <Image
            source={image}
            style={styles.avatar}
          />

          {online && <View style={styles.onlineDot} />}
        </View>
      )}

      <Text
        numberOfLines={1}
        style={styles.name}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
}