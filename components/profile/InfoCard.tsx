import React, { ReactNode } from "react";
import { Text, View } from "react-native";

import { styles } from "./InfoCard.style";

interface Props {
  title?: string;
  children: ReactNode;
}

export default function InfoCard({
  title,
  children,
}: Props) {
  return (
    <View style={styles.card}>
      {title ? (
        <Text style={styles.title}>
          {title}
        </Text>
      ) : null}

      {children}
    </View>
  );
}