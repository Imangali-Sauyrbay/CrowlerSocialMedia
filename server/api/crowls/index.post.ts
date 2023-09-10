import { User } from "@prisma/client"
import formidable from "formidable"
import { randomUUID } from "crypto"
import { CrowlDataScheme, CrowlFilesScheme } from "~/validation/crowlSchemas"
import {type Crowl, createCrowl, getCrowlById} from '~/server/database/crowls'
import { crowlExcludeTransformer } from "~/server/database/transformers/crowl"
import { createMediaFile } from "~/server/database/mediaFiles"
import { uploadToCloudinary } from "~/server/utils/cloudinary"

export default eventHandler(async (event) => {
    try {
        const user: User | undefined = event.context.user
        if(! user) return event.context.error || createNotAuthorizedError()
        
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

        if(files.media) {
            if(! Array.isArray(files.media)) files.media = [ files.media ]

            const mediaPromises = files.media.map(async (media) => {

                const uploadResponce = await uploadToCloudinary(media.filepath)

                return createMediaFile({
                    url: uploadResponce.secure_url,
                    provider_public_id: uploadResponce.public_id,
                    name: media.originalFilename ?? randomUUID(),
                    crowl_id: crowl.id,
                    mime_type: media.mimetype ?? 'image/png',
                    size: media.size,
                    file_path: null,
                })
            })

            await Promise.allSettled(mediaPromises)
        }

        const crowlWithAll = await getCrowlById(crowl.id)
        if(! crowlWithAll) return createFailedToCreateError('Crowl')
        return {
            crowl: crowlExcludeTransformer(crowlWithAll)
        }
    } catch (e) {
        return defaultErrorHandler(e)
    }
})