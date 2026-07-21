import { Ionicons } from "@expo/vector-icons";
import * as ExpoLocation from "expo-location";
import { useEffect, useMemo, useRef, useState } from "react";
import {
    ActivityIndicator,
    Modal,
    Pressable,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

import { Colors } from "@/constants/theme";
import styles from "./LocationShareSheet.style";

interface Props {
    visible: boolean;
    onClose: () => void;
    onSendCurrent: (loc: { latitude: number; longitude: number }) => void;
    onShareLive: (loc: { latitude: number; longitude: number }, durationMs: number) => void;
}

const LIVE_DURATIONS = [
    { label: "15 Minute", value: 15 * 60 * 1000 },
    { label: "1 Hour", value: 60 * 60 * 1000 },
    { label: "8 Hour", value: 8 * 60 * 60 * 1000 },
];

function buildLeafletHtml(lat: number, lon: number) {
    return `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <style>
    html,body,#map{height:100%;margin:0;padding:0;}
    .leaflet-control-attribution{display:none;}
    .pulse-marker{width:20px;height:20px;border-radius:50%;background:${Colors.brandPrimary};border:3px solid #fff;box-shadow:0 0 0 4px rgba(32,160,144,0.3);}
  </style>
</head>
<body>
  <div id="map"></div>
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <script>
    const map = L.map('map', { zoomControl: false, dragging: false, scrollWheelZoom: false, attributionControl: false }).setView([${lat}, ${lon}], 16);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map);
    const icon = L.divIcon({ className: '', html: '<div class="pulse-marker"></div>', iconSize: [20,20] });
    L.marker([${lat}, ${lon}], { icon }).addTo(map);
  </script>
</body>
</html>`;
}

export default function LocationShareSheet({ visible, onClose, onSendCurrent, onShareLive }: Props) {
    const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [showDurations, setShowDurations] = useState(false);
    const watchRef = useRef<ExpoLocation.LocationSubscription | null>(null);

    useEffect(() => {
        if (!visible) {
            watchRef.current?.remove();
            watchRef.current = null;
            setShowDurations(false);
            setCoords(null);
            return;
        }

        let cancelled = false;

        (async () => {
            setLoading(true);
            setErrorMsg(null);

            const permission = await ExpoLocation.requestForegroundPermissionsAsync();
            if (!permission.granted) {
                setErrorMsg("Location permission denied");
                setLoading(false);
                return;
            }

            const current = await ExpoLocation.getCurrentPositionAsync({
                accuracy: ExpoLocation.Accuracy.Balanced,
            });
            if (cancelled) return;

            setCoords({ latitude: current.coords.latitude, longitude: current.coords.longitude });
            setLoading(false);

            watchRef.current = await ExpoLocation.watchPositionAsync(
                { accuracy: ExpoLocation.Accuracy.Balanced, timeInterval: 4000, distanceInterval: 5 },
                (update) => {
                    setCoords({
                        latitude: update.coords.latitude,
                        longitude: update.coords.longitude,
                    });
                }
            );
        })();

        return () => {
            cancelled = true;
            watchRef.current?.remove();
            watchRef.current = null;
        };
    }, [visible]);

    const html = useMemo(() => {
        if (!coords) return "";
        return buildLeafletHtml(coords.latitude, coords.longitude);
    }, [coords?.latitude, coords?.longitude]);

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent
            onRequestClose={onClose}
            statusBarTranslucent
        >
            {/* Backdrop — bahar tap karke close */}
            <Pressable style={styles.backdrop} onPress={onClose} />

            <View style={styles.sheet}>
                <View style={styles.solidBg}>
                    <SafeAreaView edges={["bottom"]}>
                        <View style={styles.handle} />

                        <View style={styles.header}>
                            <Text style={styles.headerTitle}>Share Location</Text>

                            <Pressable style={styles.closeButton} onPress={onClose} hitSlop={8}>
                                <Ionicons name="close" size={20} color={Colors.textOnDark} />
                            </Pressable>
                        </View>

                        <View style={styles.mapWrapper}>
                            {loading && (
                                <View style={styles.centerBox}>
                                    <ActivityIndicator size="large" color={Colors.brandLight} />
                                    <Text style={styles.hintText}>Finding your location...</Text>
                                </View>
                            )}

                            {!loading && errorMsg && (
                                <View style={styles.centerBox}>
                                    <Ionicons name="location-outline" size={36} color={Colors.textOnDark} />
                                    <Text style={styles.hintText}>{errorMsg}</Text>
                                </View>
                            )}

                            {!loading && !errorMsg && coords && (
                                <WebView
                                    source={{ html }}
                                    style={{ flex: 1, backgroundColor: "transparent" }}
                                    javaScriptEnabled
                                    domStorageEnabled
                                    scrollEnabled={false}
                                />
                            )}
                        </View>

                        {!showDurations ? (
                            <View style={styles.options}>
                                <Pressable
                                    style={styles.optionRow}
                                    disabled={!coords}
                                    onPress={() => coords && onSendCurrent(coords)}
                                >
                                    <View style={[styles.optionIcon, { backgroundColor: Colors.brandPrimary }]}>
                                        <Ionicons name="location" size={20} color={Colors.textOnBrand} />
                                    </View>

                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.optionTitle}>Send Current Location</Text>
                                        <Text style={styles.optionSubtitle}>
                                            Share your location once
                                        </Text>
                                    </View>

                                    <Ionicons name="chevron-forward" size={18} color="rgba(255,255,255,0.4)" />
                                </Pressable>

                                <Pressable
                                    style={styles.optionRow}
                                    disabled={!coords}
                                    onPress={() => setShowDurations(true)}
                                >
                                    <View style={[styles.optionIcon, { backgroundColor: Colors.danger }]}>
                                        <Ionicons name="radio" size={20} color={Colors.textOnDark} />
                                    </View>

                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.optionTitle}>Share Live Location</Text>

                                        <Text style={styles.optionSubtitle}>
                                            Your location will be visible until you stop sharing
                                        </Text>
                                    </View>

                                    <Ionicons name="chevron-forward" size={18} color="rgba(255,255,255,0.4)" />
                                </Pressable>
                            </View>
                        ) : (
                            <View style={styles.options}>
                                <Pressable onPress={() => setShowDurations(false)} style={styles.backRow}>
                                    <Ionicons name="chevron-back" size={18} color={Colors.brandLight} />
                                    <Text style={styles.backText}>Back</Text>
                                </Pressable>

                                <Text style={styles.durationLabel}>
                                    How long do you want to share your live location?
                                </Text>

                                {LIVE_DURATIONS.map((d) => (
                                    <Pressable
                                        key={d.value}
                                        style={styles.durationRow}
                                        onPress={() => coords && onShareLive(coords, d.value)}
                                    >
                                        <View style={styles.durationIcon}>
                                            <Ionicons name="time-outline" size={18} color={Colors.brandLight} />
                                        </View>

                                        <Text style={styles.durationText}>{d.label}</Text>

                                        <Ionicons
                                            name="chevron-forward"
                                            size={16}
                                            color="rgba(255,255,255,0.4)"
                                            style={{ marginLeft: "auto" }}
                                        />
                                    </Pressable>
                                ))}
                            </View>
                        )}
                    </SafeAreaView>
                </View>
            </View>
        </Modal>
    );
}