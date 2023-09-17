import { createNotAuthorizedError } from '~/server/utils/ErrorFactories'
import { getRefreshTokenByToken, deleteRefreshTokenByID } from '~/server/database/refreshTokens'

export default eventHandler(async (event) => {
    try {
        const refreshTokenCookie = getCookie(event, 'refresh_token')

        if(! refreshTokenCookie) {
            return createNotAuthorizedError("Refresh token not setted")
        }

        const refreshToken = await getRefreshTokenByToken(refreshTokenCookie)

        if(! refreshToken) {
            return createNotAuthorizedError("Invalid refresh token")
        }
        
        await deleteRefreshTokenByID(refreshToken.id)

        return {
            success: true
        }
    } catch (e) {
        return defaultErrorHandler(e);
    }
})