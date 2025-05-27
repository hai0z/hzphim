import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    domains: [
      "fakestoreapi.com",
      "image.tmdb.org",
      "themoviedb.org",
      "www.youtube.com",
      "phimimg.com",
    ],
    unoptimized: true,
  },

  env: {
    TMDB: "1425c50ed9fac25f4106f9ebe277b64c",
  },
};

export default nextConfig;
