import type { StarlightThemeRosePineConfig } from "./config";

type Variant = StarlightThemeRosePineConfig["dark" | "light"];

export function getThemeStylesheets(
  config: StarlightThemeRosePineConfig
): string[] {
  return [
    "starlight-theme-rose-pine/styles/shared.css",
    getVariantStylesheet(config.dark),
    getVariantStylesheet(config.light),
  ];
}

function getVariantStylesheet({ flavor, accent }: Variant): string {
  return `starlight-theme-rose-pine/themes/rose-pine-${flavor}-${accent}.css`;
}
