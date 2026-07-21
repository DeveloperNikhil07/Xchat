import { Ionicons } from "@expo/vector-icons";
import { useEffect, useMemo, useState } from "react";
import { Linking, Modal, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

import { Colors } from "@/constants/theme";
import styles from "./LocationViewer.style";

interface Props {
    visible: boolean;
    latitude: number | null;
    longitude: number | null;
    address?: string;
    isLive?: boolean;
    liveUntil?: number;
    isSender?: boolean;
    onClose: () => void;
    onStopSharing?: () => void;
}

function buildLeafletHtml(lat: number, lon: number) {
    return `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <style>html,body,#map{height:100%;margin:0;padding:0;}
    .pulse-marker{width:22px;height:22px;border-radius:50%;background:${Colors.brandPrimary};border:3px solid #fff;box-shadow:0 0 0 3px rgba(32,160,144,0.35);}
  </style>
</head>
<body>
  <div id="map"></div>
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <script>
    const map = L.map('map', { zoomControl: false }).setView([${lat}, ${lon}], 16);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map);
    const icon = L.divIcon({ className: '', html: '<div class="pulse-marker"></div>', iconSize: [22,22] });
    L.marker([${lat}, ${lon}], { icon }).addTo(map);
  </script>
</body>
</html>`;
}

function timeLeftLabel(liveUntil?: number) {
    if (!liveUntil) return "";
    const diffMs = liveUntil - Date.now();
    if (diffMs <= 0) return "Live location khatam ho gayi";
    const mins = Math.ceil(diffMs / 60000);
    return mins < 60 ? `${mins} min baaki` : `${Math.floor(mins / 60)} ghante baaki`;
}

export default function LocationViewer({
    visible,
    latitude,
    longitude,
    address,
    isLive,
    liveUntil,
    isSender,
    onClose,
    onStopSharing,
}: Props) {
    const [, forceTick] = useState(0);

    useEffect(() => {
        if (!isLive) return;
        const interval = setInterval(() => forceTick((t) => t + 1), 30000);
        return () => clearInterval(interval);
    }, [isLive]);

    const html = useMemo(() => {
        if (latitude == null || longitude == null) return "";
        return buildLeafletHtml(latitude, longitude);
    }, [latitude, longitude]);

    if (latitude == null || longitude == null) return null;

    const openInMaps = () => {
        Linking.openURL(
            `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`
        );
    };

    return (
        <Modal visible={visible} animationType="slide" onRequestClose={onClose} statusBarTranslucent>
            <SafeAreaView style={styles.container} edges={["top"]}>
                <View style={styles.header}>
                    <Pressable style={styles.backButton} onPress={onClose} hitSlop={8}>
                        <Ionicons name="arrow-back" size={20} color={Colors.textPrimary} />
                    </Pressable>

                    <View style={styles.headerText}>
                        <Text style={styles.title} numberOfLines={1}>
                            {isLive ? "Live Location" : address || "Location"}
                        </Text>
                        {isLive && (
                            <View style={styles.liveRow}>
                                <View style={styles.liveDotSmall} />
                                <Text style={styles.subtitle}>{timeLeftLabel(liveUntil)}</Text>
                            </View>
                        )}
                    </View>

                    <Pressable style={styles.navButton} onPress={openInMaps} hitSlop={8}>
                        <Ionicons name="navigate" size={18} color={Colors.brandPrimary} />
                    </Pressable>
                </View>

                <WebView source={{ html }} style={{ flex: 1 }} javaScriptEnabled domStorageEnabled />

                {isLive && isSender ? (
                    <Pressable
                        style={[styles.footerButton, styles.stopButton]}
                        onPress={onStopSharing}
                    >
                        <Ionicons name="stop-circle-outline" size={18} color={Colors.textOnDark} />
                        <Text style={styles.stopButtonText}>Live Location Band Karein</Text>
                    </Pressable>
                ) : (
                    <Pressable
                        style={[styles.footerButton, styles.openMapsButton]}
                        onPress={openInMaps}
                    >
                        <Ionicons name="navigate" size={18} color={Colors.textOnBrand} />
                        <Text style={styles.openMapsText}>Google Maps me Dekhein</Text>
                    </Pressable>
                )}
            </SafeAreaView>
        </Modal>
    );
}