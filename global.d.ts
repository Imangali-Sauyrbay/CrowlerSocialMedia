declare module NodeJS {
    interface ProcessEnv {
        JWT_ACCESS_TOKEN_SECRET: string | null;
        JWT_REFRESH_TOKEN_SECRET: string | null;
        CLOUDINARY_CLOUD_NAME: string | null;
        CLOUDINARY_API_KEY: string | null;
        CLOUDINARY_API_SECRET: string | null;
    }
}
