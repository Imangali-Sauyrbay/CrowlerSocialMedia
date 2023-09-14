import { userExcludeTransformer } from "~/server/database/transformers/user"
import { getUserFromContext } from "~/server/utils/authUtils"

export default eventHandler((event) => {
    const user = getUserFromContext(event.context)

    return {
        user: userExcludeTransformer(user)
    }
})