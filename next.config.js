const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx',
})
 
module.exports = {
    ...withNextra(),
    images: {
      unoptimized: true,
    },
    assetPrefix:
    process.env.NODE_ENV === "production"
      ? "https://kimzerovirus.github.io/til"
      : "",
  };
 
// If you have other Next.js configurations, you can pass them as the parameter:
// module.exports = withNextra({ /* other next.js config */ })