import { defineConfig } from "vitepress";
import tailwindcss from "@tailwindcss/vite";
import { version } from "../../lib/package.json";
import { fileURLToPath, URL } from "node:url";

export const currentVersion = `v${version}`;

export const versions = [
  { version: currentVersion },
  { version: "v2.5.1", link: "https://vue-currency-input-v2.netlify.app/" },
  { version: "v1.22.6", link: "https://vue-currency-input-v1.netlify.app/" },
];

export default defineConfig({
  title: "Vue Currency Input",
  description: "Easy input of currency formatted numbers for Vue.js",
  head: [["link", { rel: "icon", href: "/vue-currency-input/favicon.png" }]],
  base: "/vue-currency-input/",
  themeConfig: {
    logo: "/favicon.png",
    nav: [
      {
        text: "❤ Sponsor",
        link: "https://ko-fi.com/dm4t2",
      },
      {
        text: currentVersion,
        items: [
          ...versions.map((i) =>
            i.version === currentVersion
              ? {
                  text: `${i.version} (Current)`,
                  activeMatch: "/",
                  link: "/",
                }
              : {
                  text: i.version,
                  link: i.link,
                },
          ),
        ],
      },
      {
        text: "Release Notes",
        link: "https://github.com/dm4t2/vue-currency-input/releases",
      },
    ],
    sidebar: [
      {
        text: "Guide",
        link: "/guide",
      },
      {
        text: "Configuration",
        link: "/config",
      },
      {
        text: "Playground",
        link: "/playground",
      },
      {
        text: "Examples",
        link: "/examples",
      },
      {
        text: "API",
        link: "/api",
      },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/dm4t2/vue-currency-input" },
    ],
  },
});
