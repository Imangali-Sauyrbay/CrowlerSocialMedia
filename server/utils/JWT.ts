import { type User } from "@prisma/client";
import jwt, { type JwtPayload } from "jsonwebtoken"; /* eslint-disable-line */
import { type H3Event } from "h3";

type Tokens = {
    accessToken: string;
    refreshToken: string;
};

export const generateAccessToken = (user: User): string => {
    const config = useRuntimeConfig();

    /* eslint-disable-next-line */
    return jwt.sign(
        { userId: user.id },
        config.jwtAccessSecret,
        { expiresIn: "10m" }
    );
};

export const generateRefreshToken = (user: User): string => {
    const config = useRuntimeConfig();

    /* eslint-disable-next-line */
    return jwt.sign(
        { userId: user.id },
        config.jwtRefreshSecret,
        { expiresIn: "4h" }
    );
};

export const generateTokens = (user: User): Tokens => ({
    accessToken: generateAccessToken(user),
    refreshToken: generateRefreshToken(user),
});

export const sendRefreshToken = (event: H3Event, refreshToken: string) => {
    setCookie(event, "refresh_token", refreshToken, {
        httpOnly: true,
        sameSite: true,
    });
};

export const decodeRefreshToken = (token: string) => {
    const config = useRuntimeConfig();

    try {
        const decoded = jwt.verify(token, config.jwtRefreshSecret)

        if (typeof decoded === 'string') {
            return {
                payload: decoded
            } as JwtPayload
        }

        return decoded
    } catch (error) {
        return null
    }
}

export const decodeAccessToken = (token: string) => {
    const config = useRuntimeConfig();

    try {
        const decoded = jwt.verify(token, config.jwtAccessSecret)

        if (typeof decoded === 'string') {
            return {
                payload: decoded
            } as JwtPayload
        }

        return decoded
    } catch (error) {
        return null
    }
}
