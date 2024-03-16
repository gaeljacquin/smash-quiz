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
    ],
  },
  env: {
    imagePath: `${process.env.NEXT_PUBLIC_CLOUDINARY_IMAGE_PATH}`,
  },
};

export default config;
