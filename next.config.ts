import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // This project lives at raio/blog inside the raio git repo, but it's
    // its own package root — pin it explicitly so Next stops guessing.
    root: __dirname,
  },
};

export default nextConfig;
