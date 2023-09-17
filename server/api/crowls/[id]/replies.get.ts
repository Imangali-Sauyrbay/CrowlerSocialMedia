import {
    getCrowlRepliesById,
    getCrowlsRepliesPageCount,
} from "~/server/database/crowls";
import { crowlExcludeTransformer } from "~/server/database/transformers/crowl";
import { isNumeric } from "~/utils/math";

export default eventHandler(async (event) => {
    try {
        const id = getRouterParam(event, "id");
        if (!id || !isNumeric(id))
            return createValidationError({ id: "number" });

        let { page = 1 } = getQuery<{
            page?: number;
        }>(event);

        page = +page <= 0 ? 1 : +page;

        const crowls = await getCrowlRepliesById(+id, page, {
            include: {
                medias: true,
                author: true,

                _count: {
                    select: {
                        replies: true,
                    },
                },
            },

            includeDefault: false,
        });

        if (!crowls) return createFailedToRetrieveError("crowl");

        return {
            crowls: crowls.map(crowlExcludeTransformer),
            page,
            pages: await getCrowlsRepliesPageCount(+id),
        };
    } catch (e) {
        return defaultErrorHandler(e);
    }
});
