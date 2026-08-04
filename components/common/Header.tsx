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
        {/* Left */}
        <View style={styles.side}>
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
        </View>

        {/* Center Title */}
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
        <View style={styles.side}>
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
          ) : null}
        </View>
      </View>
    </>
  );
}