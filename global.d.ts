declare module NodeJS {
    interface ProcessEnv {
        JWT_ACCESS_TOKEN_SECRET: string | null
        JWT_REFRESH_TOKEN_SECRET: string | null
    }
}