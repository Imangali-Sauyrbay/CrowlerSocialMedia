import { User } from "@prisma/client"
import formidable from "formidable"
import { CrowlDataScheme, CrowlFilesScheme } from "~/validation/crowlSchemas"
import {type Crowl, createCrowl} from '~/server/database/crowls'
import { crowlExcludeTransformer } from "~/server/database/transformers/crowl"

export default eventHandler(async (event) => {
    try {
        const user: User | undefined = event.context.user
        if(! user) return createNotAuthorizedError()
        
        const formData = formidable({})
        const data = await formData.parse(event.node.req)

        // return {data}
        const [fields, files] = [
            await CrowlDataScheme.validate(data[0], { abortEarly: false }),
            await CrowlFilesScheme.validate(data[1], { abortEarly: false })
        ]

        const crowlData: Crowl = {
            text: fields.text.join(' '),
            author_id: user.id
        }

        const crowl = await createCrowl(crowlData)

        return {
            crowl: crowlExcludeTransformer(crowl), fields, files, user
        }
    } catch (e) {
        return defaultErrorHandler(e)
    }
})