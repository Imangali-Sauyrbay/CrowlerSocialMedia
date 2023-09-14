import { getCrowls, getCrowlsPageCount } from "~/server/database/crowls"
import { crowlExcludeTransformer } from "~/server/database/transformers/crowl"

export default eventHandler(async (event) => {
    try {
        let { page = 1 } = getQuery<{
            page?: number
        }>(event)
        
        page = page <= 0 ? 1 : page

        const crowlWithAll = await getCrowls({
            page,
            includeDefaults: true,
            shouldPaginate: true,
            params: {
                include: {
                    medias: true,
                    author: true,
                    replied_to: true,

                    replies: {
                        take: 5,
                        include: {
                            medias: true,
                            author: true,
                        }
                    },

                    _count: {
                        select: {
                            replies: true
                        }
                    }
                }
            }
        })

        return {
            crowls: crowlWithAll.map(crowlExcludeTransformer),
            page: +page,
            pages: await getCrowlsPageCount()
        }
    } catch (e) {
        return defaultErrorHandler(e)
    }
})