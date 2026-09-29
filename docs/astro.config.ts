import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import starlightLinksValidator from "starlight-links-validator";
import starlightRosePine from "starlight-theme-rose-pine";

const site =
  (process.env.CONTEXT === "deploy-preview" ||
  process.env.CONTEXT === "branch-deploy"
    ? process.env.DEPLOY_PRIME_URL
    : process.env.URL) ?? "https://starlight-theme-rose-pine.netlify.app";

export default defineConfig({
  site,
  integrations: [
    starlight({
      credits: true,
      components: {
        Footer: "./src/components/Footer.astro",
      },
      favicon: "/favicon.png",
      editLink: {
        baseUrl:
          "https://github.com/trueberryless-org/starlight-theme-rose-pine/edit/main/docs/",
      },
      head: [
        {
          tag: "meta",
          attrs: {
            property: "og:image",
            content: new URL("og.png", site).href,
          },
        },
        {
          tag: "meta",
          attrs: {
            property: "og:image:alt",
            content: "Soho vibes for Starlight.",
          },
        },
      ],
      plugins: [
        starlightRosePine(),
        starlightLinksValidator({
          exclude: ["#_"],
        }),
      ],
      sidebar: [
        {
          label: "Start Here",
          items: ["getting-started", "configuration", "customization"],
        },
        {
          label: "Examples",
          items: [{ autogenerate: { directory: "examples" } }],
        },
      ],
      social: [
        {
          icon: "blueSky",
          label: "BlueSky",
          href: "https://bsky.app/profile/felixs.dev",
        },
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/trueberryless-org/starlight-theme-rose-pine",
        },
      ],
      title: "Starlight Rosé Pine",
    }),
  ],
});
