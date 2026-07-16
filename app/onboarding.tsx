import Button from "@/components/ui/Button";
import Colors from "@/constants/theme";
import { styles } from "@/styles/onboarding.style";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const DATA = [
  {
    id: "1",
    title: "Chat Freely",
    subtitle:
      "Connect with friends instantly and share every moment together.",
  },
  {
    id: "2",
    title: "Your Conversations,\nYour Space",
    subtitle:
      "Private, secure and simple chat experience designed just for you.",
  },
];

export default function Onboarding() {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const onNext = () => {
    if (currentIndex < DATA.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
        // router.replace("/(auth)/login");
        router.replace("/(tabs)/home");
    }
  };

  return (
    <LinearGradient
      colors={[Colors.background, Colors.brandDark, Colors.brandPrimary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <TouchableOpacity
        style={styles.skipBtn}
        onPress={() => router.push("/(auth)/login")}
      >
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <FlatList
        ref={flatListRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={DATA}
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(
            e.nativeEvent.contentOffset.x / width
          );
          setCurrentIndex(index);
        }}
        renderItem={({ item, index }) => (
          <View style={styles.page}>
            {/* Background Circles */}

            <View style={styles.circle1} />
            <View style={styles.circle2} />

            {/* Floating Icons */}

            <Ionicons
              name="chatbubble-ellipses"
              size={28}
              color="rgba(255,255,255,.15)"
              style={styles.icon1}
            />

            <Ionicons
              name="paper-plane"
              size={24}
              color="rgba(255,255,255,.18)"
              style={styles.icon2}
            />

            <Ionicons
              name="lock-closed"
              size={22}
              color="rgba(255,255,255,.15)"
              style={styles.icon3}
            />

            <Ionicons
              name="shield-checkmark"
              size={24}
              color="rgba(255,255,255,.18)"
              style={styles.icon4}
            />

            {/* Phone Card */}

            <View style={styles.phoneCard}>

              <View style={styles.headerRow}>
                <Image
                  source={require("@/assets/images/man.png")}
                  style={styles.avatar}
                />

                <View style={{ marginLeft: 10 }}>
                  <Text style={styles.name}>Alex</Text>
                  <Text style={styles.online}>Online</Text>
                </View>
              </View>

              <View style={styles.leftBubble}>
                <Text style={styles.bubbleText}>
                  Hello 👋
                </Text>
              </View>

              <View style={styles.rightBubble}>
                <Text style={styles.rightBubbleText}>
                  Hi, how are you?
                </Text>
              </View>

              <View style={styles.leftBubble}>
                <Ionicons
                  name="ellipsis-horizontal"
                  size={22}
                  color={Colors.textPrimary}
                />
              </View>
            </View>

            {/* Second Screen Extra */}

            {index === 1 && (
              <View style={styles.bottomIcons}>
                <View style={styles.smallIcon}>
                  <Ionicons
                    name="lock-closed"
                    size={20}
                    color="#fff"
                  />
                </View>

                <View style={styles.bigIcon}>
                  <Ionicons
                    name="chatbubble-ellipses"
                    size={32}
                    color="#fff"
                  />
                </View>

                <View style={styles.smallIcon}>
                  <Ionicons
                    name="shield-checkmark"
                    size={20}
                    color="#fff"
                  />
                </View>
              </View>
            )}

            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>

              <Text style={styles.subtitle}>
                {item.subtitle}
              </Text>
            </View>
          </View>
        )}
      />

      <View style={styles.footer}>
        <View style={styles.indicatorContainer}>
          {DATA.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentIndex === index &&
                styles.activeDot,
              ]}
            />
          ))}
        </View>

        <Button
          title={currentIndex === 1 ? "Get Started" : "Next"}
          onPress={onNext}
        />
      </View>
    </LinearGradient>
  );
}