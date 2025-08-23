import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    loader: 'custom',
    loaderFile: './utils/supabase/image-loader.ts',
  }
};

export default nextConfig;
