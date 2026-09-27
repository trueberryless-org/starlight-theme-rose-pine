import fs from "node:fs";
import path from "node:path";

import colors from "../colors.json" with { type: "json" };

type Palette = (typeof colors.flavors)[keyof typeof colors.flavors];
type Accent = keyof Palette;

interface Hsl {
  h: number;
  s: number;
  l: number;
}

const themesDir = path.join(import.meta.dirname, "../themes");

fs.mkdirSync(themesDir, { recursive: true });

for (const [flavor, palette] of Object.entries(colors.flavors)) {
  for (const accent of colors.accents) {
    fs.writeFileSync(
      path.join(themesDir, `rose-pine-${flavor}-${accent}.css`),
      getThemeCss(palette, palette[accent as Accent])
    );
  }
}

function getThemeCss(p: Palette, accentHex: string): string {
  const isDark = p.type === "dark";

  return `@layer rose-pine {
  :root${p.type === "light" ? '[data-theme="light"]' : ""} {
    --sl-color-accent-low: ${getHslStr(accentHex, isDark ? -45 : -25)};
    --sl-color-accent: ${getHslStr(accentHex)};
    --sl-color-accent-high: ${getHslStr(accentHex, isDark ? 25 : 45)};

    --sl-color-white: ${p.text};
    --sl-color-gray-1: ${p.subtle};
    --sl-color-gray-2: ${p.muted};
    --sl-color-gray-3: ${p.highlightHigh};
    --sl-color-gray-4: ${p.highlightMed};
    --sl-color-gray-5: ${p.overlay};
    --sl-color-gray-6: ${p.highlightLow};
    --sl-color-gray-7: ${p.surface};
    --sl-color-black: ${p.base};

    --sl-hue-orange: ${hexToHsl(p.gold).h};
    --sl-color-orange-low: ${getHslStr(p.gold, isDark ? -30 : 30)};
    --sl-color-orange: ${getHslStr(p.gold)};
    --sl-color-orange-high: ${getHslStr(p.gold, isDark ? 15 : -15)};

    --sl-hue-green: ${hexToHsl(p.pine).h};
    --sl-color-green-low: ${getHslStr(p.pine, isDark ? -10 : 30)};
    --sl-color-green: ${getHslStr(p.pine, isDark ? 20 : 0)};
    --sl-color-green-high: ${getHslStr(p.pine, isDark ? 15 : -15)};

    --sl-hue-blue: ${hexToHsl(p.foam).h};
    --sl-color-blue-low: ${getHslStr(p.foam, isDark ? -30 : 30)};
    --sl-color-blue: ${getHslStr(p.foam)};
    --sl-color-blue-high: ${getHslStr(p.foam, isDark ? 15 : -15)};

    --sl-hue-purple: ${hexToHsl(p.iris).h};
    --sl-color-purple-low: ${getHslStr(p.iris, isDark ? -30 : 30)};
    --sl-color-purple: ${getHslStr(p.iris)};
    --sl-color-purple-high: ${getHslStr(p.iris, isDark ? 15 : -15)};

    --sl-hue-red: ${hexToHsl(p.love).h};
    --sl-color-red-low: ${getHslStr(p.love, isDark ? -30 : 30)};
    --sl-color-red: ${getHslStr(p.love)};
    --sl-color-red-high: ${getHslStr(p.love, isDark ? 15 : -15)};

    color-scheme: ${p.type};
  }
}
`;
}

function getHslStr(hex: string, lOffset = 0): string {
  const { h, s, l } = hexToHsl(hex);
  const newL = clamp(l + lOffset, 0, 100);

  return `hsl(${h}, ${s}%, ${newL}%)`;
}

function hexToHsl(hex: string): Hsl {
  const r = parseInt(hex.substring(1, 3), 16) / 255;
  const g = parseInt(hex.substring(3, 5), 16) / 255;
  const b = parseInt(hex.substring(5, 7), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;

  if (max === min) return roundHsl({ h: 0, s: 0, l });

  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

  return roundHsl({ h: getHue(r, g, b, max, d), s, l });
}

function getHue(r: number, g: number, b: number, max: number, d: number) {
  switch (max) {
    case r:
      return ((g - b) / d + (g < b ? 6 : 0)) / 6;
    case g:
      return ((b - r) / d + 2) / 6;
    default:
      return ((r - g) / d + 4) / 6;
  }
}

function roundHsl({ h, s, l }: Hsl): Hsl {
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
