import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { styles } from "./RequestActions.style";

interface Props {
  requestId?: string;
  loading?: boolean;
  userName?: string;
  userImage?: string;
  onAccept: () => void;
  onBlock: () => void;
}

export default function RequestActions({
  loading = false,
  userName = "Unknown User",
  userImage,
  onAccept,
  onBlock,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.handle} />

      <View style={styles.avatarWrapper}>
        {userImage ? (
          <Image
            source={{ uri: userImage }}
            style={styles.avatar}
          />
        ) : (
          <View style={styles.placeholderAvatar}>
            <Ionicons
              name="person"
              size={42}
              color="#FFFFFF"
            />
          </View>
        )}

        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            NEW REQUEST
          </Text>
        </View>
      </View>

      <Text style={styles.title}>
        {userName}
      </Text>

      <Text style={styles.subtitle}>
        wants to chat with you
      </Text>

      <Text style={styles.description}>
        Accept this request to start messaging instantly.
        You can decline if you don't know this person.
      </Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.declineButton}
          activeOpacity={0.85}
          onPress={onBlock}
          disabled={loading}
        >
          <Ionicons
            name="close"
            size={18}
            color="#666"
          />

          <Text style={styles.declineText}>
            Decline
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.acceptButton}
          activeOpacity={0.85}
          onPress={onAccept}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <>
              <Ionicons
                name="checkmark"
                size={18}
                color="#FFF"
              />

              <Text style={styles.acceptText}>
                Accept
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}