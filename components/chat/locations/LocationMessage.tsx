import { Ionicons } from "@expo/vector-icons";
import { useMemo } from "react";
import { Pressable, Text, View } from "react-native";
import { WebView } from "react-native-webview";

import { Colors } from "@/constants/theme";
import styles from "./LocationMessage.style";

interface Props {
    latitude: number;
    longitude: number;
    address?: string;
    isLive?: boolean;
    liveUntil?: number;
    onPress?: () => void;
}

function buildMiniMapHtml(lat: number, lon: number) {
    return `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <style>
    html,body,#map{height:100%;margin:0;padding:0;background:${Colors.surfaceAlt};}
    .leaflet-control-attribution{display:none;}
    .pin{width:26px;height:26px;border-radius:50%;background:${Colors.brandPrimary};border:3px solid #fff;box-shadow:0 0 0 3px rgba(32,160,144,0.35);}
  </style>
</head>
<body>
  <div id="map"></div>
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <script>
    const map = L.map('map', {
      zoomControl: false, dragging: false, scrollWheelZoom: false,
      doubleClickZoom: false, boxZoom: false, touchZoom: false, keyboard: false,
      attributionControl: false,
    }).setView([${lat}, ${lon}], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map);
    const icon = L.divIcon({ className: '', html: '<div class="pin"></div>', iconSize: [26,26] });
    L.marker([${lat}, ${lon}], { icon }).addTo(map);
  </script>
</body>
</html>`;
}

function timeLeftLabel(liveUntil?: number) {
    if (!liveUntil) return "";
    const diffMs = liveUntil - Date.now();
    if (diffMs <= 0) return "Live location khatam";
    const mins = Math.ceil(diffMs / 60000);
    return mins < 60 ? `${mins} min tak live` : `${Math.floor(mins / 60)} ghante tak live`;
}

export default function LocationMessage({
    latitude,
    longitude,
    address,
    isLive,
    liveUntil,
    onPress,
}: Props) {
    const html = useMemo(() => buildMiniMapHtml(latitude, longitude), [latitude, longitude]);

    return (
        <Pressable style={styles.container} onPress={onPress}>
            <View style={styles.mapWrapper}>
                <WebView
                    source={{ html }}
                    style={styles.map}
                    scrollEnabled={false}
                    pointerEvents="none"
                    javaScriptEnabled
                    domStorageEnabled
                    androidLayerType="hardware"
                />

                {/* Touch overlay — WebView apne touches khud consume kar sakti hai,
                    isliye pura tap area transparent overlay se cover karo */}
                <View style={styles.touchOverlay} pointerEvents="none" />

                {isLive && (
                    <View style={styles.liveBadge}>
                        <View style={styles.liveDot} />
                        <Text style={styles.liveBadgeText}>LIVE</Text>
                    </View>
                )}
            </View>

            <View style={styles.footer}>
                <View
                    style={[
                        styles.footerIconBox,
                        { backgroundColor: isLive ? "#3A1E1E" : "#1C2E2A" },
                    ]}
                >
                    <Ionicons
                        name={isLive ? "radio" : "location"}
                        size={13}
                        color={isLive ? Colors.danger : Colors.brandLight}
                    />
                </View>
                <Text style={styles.footerText} numberOfLines={1}>
                    {isLive ? timeLeftLabel(liveUntil) : address || "Location"}
                </Text>
            </View>
        </Pressable>
    );
}