import { userExcludeTransformer } from "~/server/database/transformers/user"

export default eventHandler((event) => {
    return {
        user: event.context.user && userExcludeTransformer(event.context.user)
    }
})