import type { StarlightPlugin } from "@astrojs/starlight/types";

import {
  type StarlightThemeRosePineConfig,
  type StarlightThemeRosePineUserConfig,
  validateConfig,
} from "./libs/config";
import { getThemeStylesheets } from "./libs/theme";

export type { StarlightThemeRosePineConfig, StarlightThemeRosePineUserConfig };

export default function starlightThemeRosePine(
  userConfig?: StarlightThemeRosePineUserConfig
): StarlightPlugin {
  const config = validateConfig(userConfig);

  return {
    name: "starlight-theme-rose-pine",
    hooks: {
      "config:setup"({ config: starlightConfig, updateConfig }) {
        updateConfig({
          customCss: [
            ...(starlightConfig.customCss ?? []),
            ...getThemeStylesheets(config),
          ],
        });
      },
    },
  };
}
