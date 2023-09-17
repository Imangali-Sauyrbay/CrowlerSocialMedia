import { getCrowlById } from "~/server/database/crowls";
import { crowlExcludeTransformer } from "~/server/database/transformers/crowl";
import { isNumeric } from "~/utils/math";

export default eventHandler(async (event) => {
    try {
        const id = getRouterParam(event, "id");
        if (!id || !isNumeric(id))
            return createValidationError({ id: "number" });

        const crowl = await getCrowlById(+id, {
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

            includeDefault: false,
        });

        if (!crowl) return createFailedToRetrieveError("crowl");

        return {
            crowl: crowlExcludeTransformer(crowl),
        };
    } catch (e) {
        return defaultErrorHandler(e);
    }
});
