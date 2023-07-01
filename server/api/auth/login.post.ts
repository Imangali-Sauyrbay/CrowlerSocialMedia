import { LoginRequest, LoginSchema } from "~/validation/authSchemas"
import { defaultErrorHandler } from '~/server/utils/ErrorHandlers'
import { findUserByUsername } from "~/server/database/users"
import {
    createUserNotExistsError,
    createPasswordNotMatchError,
    createFailedToCreateError
} from "~/server/utils/ErrorFactories"
import { comparePasswords } from '~/server/utils/Hash'
import { generateTokens, sendRefreshToken } from "~/server/utils/JWT"
import { userExcludeTransformer } from "~/server/database/transformers/user"
import { createRefreshToken } from "~/server/database/refreshTokens"

export default eventHandler(async (event) => {
    try {
        const body = await readBody<LoginRequest>(event)

        const { password, username } = await LoginSchema.validate(body, { abortEarly: false })

        const user = await findUserByUsername(username)

        if (!user)
            return createUserNotExistsError()

        if (! await comparePasswords(password, user.password))
            return createPasswordNotMatchError()

        const { accessToken, refreshToken } = generateTokens(user)

        const token = await createRefreshToken(refreshToken, user)

        if (!token)
            return createFailedToCreateError('token')

        sendRefreshToken(event, token.token)

        return {
            access_token: accessToken,
            user: userExcludeTransformer(user)
        }
    } catch (e) {
        return defaultErrorHandler(e)
    }
})