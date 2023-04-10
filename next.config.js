const debug = process.env.NODE_ENV !== "production";

const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.jsx",
});

module.exports = {
  ...withNextra(),
  images: {
    unoptimized: true,
  },
  assetPrefix: !debug ? `https://kimzerovirus.github.io/TIL/` : "",
  basePath: "/TIL" //https://github.com/shuding/nextra/issues/137
};

// If you have other Next.js configurations, you can pass them as the parameter:
// module.exports = withNextra({ /* other next.js config */ })
