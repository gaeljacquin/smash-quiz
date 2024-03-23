/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./app/env.js");

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'ahacverhpougzlzojfyo.supabase.co',
        pathname: '**',
      },
    ],
  },
  env: {
    supabaseUrl: `${process.env.NEXT_PUBLIC_SUPABASE_URL}`,
    characterImagePath: `${process.env.NEXT_PUBLIC_SUPABASE_URL + process.env.NEXT_PUBLIC_SUPABASE_BUCKET_PATH + process.env.NEXT_PUBLIC_SUPABASE_SSBU_ROSTER_BUCKET}`,
    gameClipPath: `${process.env.NEXT_PUBLIC_SUPABASE_URL + process.env.NEXT_PUBLIC_SUPABASE_BUCKET_PATH + process.env.NEXT_PUBLIC_SUPABASE_SSBU_CLIPS_BUCKET}`,
    uncategorizedPath: `${process.env.NEXT_PUBLIC_SUPABASE_URL + process.env.NEXT_PUBLIC_SUPABASE_BUCKET_PATH + process.env.NEXT_PUBLIC_SUPABASE_UNCATEGORIZED_BUCKET}`,
    backendUrl: `${process.env.NEXT_BACKEND_URL}`,
  },
};

export default config;
