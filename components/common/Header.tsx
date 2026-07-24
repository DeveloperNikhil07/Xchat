import { Ionicons } from "@expo/vector-icons";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";

import { styles } from "./Header.style";

interface Props {
  title: string;

  onBack?: () => void;

  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightPress?: () => void;

  iconColor?: string;
}

export default function Header({
  title,
  onBack,
  rightIcon,
  onRightPress,
  iconColor = "#FFF",
}: Props) {
  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <View style={styles.container}>

        {/* Back */}

        <TouchableOpacity
          activeOpacity={0.7}
          hitSlop={12}
          style={styles.touch}
          onPress={onBack}
        >
          <Ionicons
            name="arrow-back"
            size={20}
            color={iconColor}
          />
        </TouchableOpacity>

        <Text
          numberOfLines={1}
          style={[
            styles.title,
            { color: iconColor }
          ]}
        >
          {title}
        </Text>

        {/* Right */}

        {rightIcon ? (
          <TouchableOpacity
            activeOpacity={0.7}
            hitSlop={12}
            style={styles.touch}
            onPress={onRightPress}
          >
            <Ionicons
              name={rightIcon}
              size={20}
              color={iconColor}
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.empty} />
        )}

      </View>
    </>
  );
}