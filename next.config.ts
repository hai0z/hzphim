import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "image.tmdb.org",
      "themoviedb.org",
      "www.youtube.com",
      "phimimg.com",
      "dpcpa.com",
      "phimapi.com",
    ],
    unoptimized: false,
  },

  env: {
    TMDB: "1425c50ed9fac25f4106f9ebe277b64c",
  },
};

export default nextConfig;
