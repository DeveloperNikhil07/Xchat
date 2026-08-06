import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./RecentUserCard.style";

interface Props {
  name: string;
  image?: string;
  online?: boolean;
  onPress?: () => void;
}

export default function RecentUserCard({
  name,
  image,
  online = false,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.container}
      onPress={onPress}
    >
      <View style={styles.avatarWrapper}>
        <Image
          source={
            image
              ? { uri: image }
              : require("@/assets/images/man.png")
          }
          style={styles.avatar}
        />

        {online && <View style={styles.onlineDot} />}
      </View>

      <Text
        numberOfLines={1}
        style={styles.name}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
}