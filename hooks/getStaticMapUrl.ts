export function getStaticMapUrl(
    latitude: number,
    longitude: number,
    opts?: { width?: number; height?: number; zoom?: number }
) {
    const { width = 400, height = 220, zoom = 15 } = opts || {};
    // teal pin color (hex bina #) — staticmap.openstreetmap.de custom marker color support nahi karta reliably,
    // isliye red-pushpin hi rakha hai, apna custom pin overlay (LocationMessage me) upar dikhta hai
    return `https://staticmap.openstreetmap.de/staticmap.php?center=${latitude},${longitude}&zoom=${zoom}&size=${width}x${height}`;
}