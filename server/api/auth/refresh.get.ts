import { createNotAuthorizedError } from '~/server/utils/ErrorFactories'
import { getRefreshTokenByToken, deleteRefreshTokenByID } from '~/server/database/refreshTokens'
import { decodeRefreshToken, generateAccessToken, decodeAccessToken } from '~/server/utils/JWT'
import { userExcludeTransformer } from "~/server/database/transformers/user";

export default eventHandler(async (event) => {
    try {
        const refreshTokenCookie = getCookie(event, 'refresh_token')

        if(! refreshTokenCookie) {
            return createNotAuthorizedError("Invalid refresh token")
        }

        const refreshToken = await getRefreshTokenByToken(refreshTokenCookie)

        if(! refreshToken) {
            return createNotAuthorizedError("Invalid refresh token")
        }
        
        const payload = decodeRefreshToken(refreshToken.token)

        if(! payload) {
            await deleteRefreshTokenByID(refreshToken.id)
            return createNotAuthorizedError("Refresh token expired")
        }

        const user = refreshToken.user
        const accessToken = generateAccessToken(user)

        const tenMinutes = 10 * 60 * 1000;

        return {
            access_token: accessToken,
            exp: Date.now() + tenMinutes,
            user: userExcludeTransformer(user)
        }
    } catch (e) {
        return defaultErrorHandler(e);
    }
})