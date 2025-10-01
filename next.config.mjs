/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["sequelize", "mysql2"],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push("pg", "pg-hstore");
    }
  },
};

export default nextConfig;
