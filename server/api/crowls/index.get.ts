import { getCrowls } from "~/server/database/crowls"
import { crowlExcludeTransformer } from "~/server/database/transformers/crowl"

export default eventHandler(async (event) => {
    try {
        const { page = 1 } = getQuery<{
            page?: number
        }>(event)

        const crowlWithAll = await getCrowls(page)

        return {
            crowls: crowlWithAll.map(crowlExcludeTransformer)
        }
    } catch (e) {
        return defaultErrorHandler(e)
    }
})