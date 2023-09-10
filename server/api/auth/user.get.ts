import { User } from "@prisma/client"
import { userExcludeTransformer } from "~/server/database/transformers/user"

export default eventHandler((event) => {
    const user: User | undefined = event.context.user
    if(! user) return event.context.error || createNotAuthorizedError()

    return {
        user: userExcludeTransformer(user)
    }
})