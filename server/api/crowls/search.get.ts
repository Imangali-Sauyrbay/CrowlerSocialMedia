import { findCrowls, findCrowlsPageCount } from "~/server/database/crowls";
import { crowlExcludeTransformer } from "~/server/database/transformers/crowl";

export default eventHandler(async (event) => {
    try {
        let { page = 1 } = getQuery<{
            page?: number;
        }>(event);

        const { q } = getQuery<{
            q: string;
        }>(event);

        page = +page <= 0 ? 1 : +page;

        if (!q || !q.trim())
            return {
                crowls: [],
                page,
                pages: 0,
            };

        const crowlWithAll = await findCrowls(q, {
            page,
            includeDefaults: true,
            shouldPaginate: true,
            params: {
                include: {
                    medias: true,
                    author: true,

                    replied_to: {
                        include: {
                            author: true,
                        },
                    },

                    _count: {
                        select: {
                            replies: true,
                        },
                    },
                },
            },
        });

        return {
            crowls: crowlWithAll.map(crowlExcludeTransformer),
            page,
            pages: await findCrowlsPageCount(q),
        };
    } catch (e) {
        return defaultErrorHandler(e);
    }
});
