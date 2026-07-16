import Colors from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./HomeHeader.style";

interface HomeHeaderProps {
  userName: string;
  greeting?: string;
  onSearch?: () => void;
  onMenu?: () => void;
}

export default function HomeHeader({
  userName,
  greeting = "Good Morning 👋",
  onSearch,
  onMenu,
}: HomeHeaderProps) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>{greeting}</Text>

        <Text style={styles.name}>{userName}</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.iconButton}
          onPress={onSearch}
        >
          <Ionicons
            name="search"
            size={22}
            color={Colors.textOnDark}
          />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.iconButton}
          onPress={onMenu}
        >
          <Ionicons
            name="grid-outline"
            size={22}
            color={Colors.textOnDark}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}