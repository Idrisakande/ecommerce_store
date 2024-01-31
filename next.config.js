/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg")
    );
    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: /url/ }, // exclude if *.svg?url
        use: ["@svgr/webpack"],
      }
    );
    // https://afruna-api-ba54q.ondigitalocean.app 
    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;
    return config;
  },
  env: {
    BASE_URL: "https://afruna-api-ba54q.ondigitalocean.app/api/v1",
    // BASE_URL: "https://afruna-backend-cmsxg.ondigitalocean.app/api/v1",
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "https://afruna-api-ba54q.ondigitalocean.app/api/v1/:path*",
      },
    ];
  },
  images: {
    domains: [
      "afruna-bucket.nyc3.digitaloceanspaces.com",
      "nyc3.digitaloceanspaces.com",
      'afruna-space.nyc3.digitaloceanspaces.com'
    ],
  },
};

module.exports = nextConfig;
