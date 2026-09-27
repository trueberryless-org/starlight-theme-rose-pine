import { z } from "astro/zod";

import { throwPluginError } from "./error";

export const darkFlavors = ["main", "moon"] as const;
export const lightFlavors = ["dawn"] as const;
export const accents = [
  "love",
  "gold",
  "rose",
  "pine",
  "foam",
  "iris",
] as const;

const configSchema = z
  .object({
    dark: z
      .object({
        flavor: z.enum(darkFlavors).default("main"),
        accent: z.enum(accents).default("pine"),
      })
      .prefault({}),
    light: z
      .object({
        flavor: z.enum(lightFlavors).default("dawn"),
        accent: z.enum(accents).default("pine"),
      })
      .prefault({}),
  })
  .prefault({});

export function validateConfig(
  userConfig: unknown
): StarlightThemeRosePineConfig {
  const config = configSchema.safeParse(userConfig);

  if (!config.success) {
    throwPluginError(`Invalid starlight-theme-rose-pine configuration:

${z.prettifyError(config.error)}
`);
  }

  return config.data;
}

export type StarlightThemeRosePineUserConfig = z.input<typeof configSchema>;
export type StarlightThemeRosePineConfig = z.output<typeof configSchema>;
