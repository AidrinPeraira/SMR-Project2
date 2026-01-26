export const AppConfig = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000",
  accessTokenLife: Number(process.env.NEXT_PUBLIC_ACCESS_TOKEN_LIFE) ?? 900,
  refreshTokenLife:
    Number(process.env.NEXT_PUBLIC_REFRESH_TOKEN_LIFE) ?? 172800,
  nodeEnv: process.env.NODE_ENV ?? "development",

  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
  },

  auth: {
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  },
} as const;
