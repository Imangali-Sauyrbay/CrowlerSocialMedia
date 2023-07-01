import { RegistrationSchema, type RegisterRequest } from "~/validation/authSchemas"
import { defaultErrorHandler } from '~/server/utils/ErrorHandlers'
import { createUserAlreadyExistsError } from '~/server/utils/ErrorFactories'
import { createUser, isUserExists } from "~/server/database/users"
import { userExcludeTransformer } from "~/server/database/transformers/user"

export default eventHandler(async (event) => {
    try {
        const body = await readBody<RegisterRequest>(event)

        const data = await RegistrationSchema.validate(body, { abortEarly: false })

        if (await isUserExists(data.username))
            return createUserAlreadyExistsError()

        const user = await createUser(data)

        return { success: true, user: userExcludeTransformer(user) }
    } catch (e) {
        return defaultErrorHandler(e)
    }
})