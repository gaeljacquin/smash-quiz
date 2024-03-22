import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    DATABASE_URL: z
      .string()
      .url()
      .refine(
        (str) => !str.includes("POSTGRESQL_URL_HERE"),
        "You forgot to change the default URL"
      ),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    NEXT_CLOUDINARY_IMAGE_PATH: z.string(),
    NEXT_CLOUDINARY_VIDEO_PATH: z.string(),
    NEXT_BACKEND_URL: z.string(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
    NEXT_PUBLIC_CLOUDINARY_IMAGE_PATH: z.string(),
    NEXT_PUBLIC_CLOUDINARY_VIDEO_PATH: z.string(),
    NEXT_PUBLIC_SUPABASE_URL: z.string(),
    NEXT_PUBLIC_SUPABASE_SSBU_ROSTER_BUCKET: z.string(),
    NEXT_PUBLIC_SUPABASE_SSBU_CLIPS_BUCKET: z.string(),
    NEXT_PUBLIC_SUPABASE_UNCATEGORIZED_BUCKET: z.string(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    NEXT_CLOUDINARY_IMAGE_PATH: process.env.NEXT_PUBLIC_CLOUDINARY_IMAGE_PATH,
    NEXT_CLOUDINARY_VIDEO_PATH: process.env.NEXT_PUBLIC_CLOUDINARY_VIDEO_PATH,
    NEXT_BACKEND_URL: process.env.NEXT_BACKEND_URL,
    NEXT_PUBLIC_CLOUDINARY_IMAGE_PATH: process.env.NEXT_PUBLIC_CLOUDINARY_IMAGE_PATH,
    NEXT_PUBLIC_CLOUDINARY_VIDEO_PATH: process.env.NEXT_PUBLIC_CLOUDINARY_VIDEO_PATH,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_SSBU_ROSTER_BUCKET: process.env.NEXT_PUBLIC_SUPABASE_SSBU_ROSTER_BUCKET,
    NEXT_PUBLIC_SUPABASE_SSBU_CLIPS_BUCKET: process.env.NEXT_PUBLIC_SUPABASE_SSBU_CLIPS_BUCKET,
    NEXT_PUBLIC_SUPABASE_UNCATEGORIZED_BUCKET: process.env.NEXT_PUBLIC_SUPABASE_UNCATEGORIZED_BUCKET,
    // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined.
   * `SOME_VAR: z.string()` and `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
