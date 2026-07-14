/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

/**
 * NeoXchat — Design Tokens / Color Constants
 * Extracted from the reference UI screens (Home, Home Delete, Message)
 * Use these across the app so every screen stays visually consistent.
 */

export const Colors = {
  // ---------- Brand ----------
  brandPrimary: "#20A090",   // Main teal — buttons, active tab, sent bubble, links
  brandLight: "#3FD9B8",     // Lighter teal — gradients, hover/pressed states
  brandDark: "#178071",      // Darker teal — pressed state / dark-mode accents

  // ---------- Base / Neutral ----------
  ink: "#000E08",            // Near-black (dark bg AND primary text on white)
  background: "#0A0A0F",     // App dark background (splash, dark screens)
  surface: "#FFFFFF",        // Card / list / white screen background
  surfaceAlt: "#F9F9F9",     // Slightly off-white surface (subtle sections)

  // ---------- Text ----------
  textPrimary: "#000E08",    // Headings, names, main content
  textSecondary: "#9B9B9B",  // Timestamps, subtitles, placeholder text
  textOnDark: "#FFFFFF",     // Text on dark backgrounds / header
  textOnBrand: "#FFFFFF",    // Text on teal buttons / bubbles

  // ---------- Borders / Dividers ----------
  divider: "#E5E7E7",        // List separators, input borders
  border: "#E0E0E0",         // Generic light border

  // ---------- Chat bubbles ----------
  bubbleSent: "#20A090",       // Sent message background
  bubbleSentText: "#FFFFFF",   // Sent message text
  bubbleReceived: "#EDF2F5",   // Received message background
  bubbleReceivedText: "#000E08", // Received message text

  // ---------- Status / Feedback ----------
  success: "#0FE16D",   // Online status dot
  danger: "#F04A4C",    // Notification badge, delete action
  warning: "#F5A623",   // (extend as needed)
  info: "#3B82F6",      // (extend as needed)

  // ---------- Bottom Navigation ----------
  navActive: "#20A090",
  navInactive: "#9B9B9B",
  navBackground: "#FFFFFF",

  // ---------- Misc ----------
  overlay: "rgba(0,14,8,0.6)",  // Modal / sheet backdrop
  shadow: "rgba(0,0,0,0.12)",
};

// Optional: quick gradient tokens (used in logo / splash / highlights)
export const Gradients = {
  brand: ["#20A090", "#3FD9B8"],   // teal gradient
  accentPurpleBlue: ["#7C3AED", "#3B82F6"], // secondary accent (from logo)
};

export default Colors;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
