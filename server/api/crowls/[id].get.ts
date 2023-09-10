import { getCrowlById } from "~/server/database/crowls"
import { crowlExcludeTransformer } from "~/server/database/transformers/crowl"
import { isNumeric } from "~/utils/math"

export default eventHandler(async (event) => {
    try {
        const id = getRouterParam(event, 'id')
        if(! id || !isNumeric(id)) return createUserNotExistsError()

        const crowlWithAll = await getCrowlById(+id)

        if(! crowlWithAll) return createUserNotExistsError()
        
        return {
            crowl: crowlExcludeTransformer(crowlWithAll)
        }
    } catch (e) {
        return defaultErrorHandler(e)
    }
})