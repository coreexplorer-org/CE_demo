const nextConfig = {
  experimental: {
    appDir: true,
  },
  // Add this to help with dependency resolution
  webpack: (config, { isServer }) => {
    // This is to handle the date-fns and react-day-picker compatibility
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "date-fns": require.resolve("date-fns"),
      }
    }
    return config
  },
}

module.exports = nextConfig

