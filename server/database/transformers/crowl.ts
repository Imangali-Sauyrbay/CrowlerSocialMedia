import { Crowl, User, MediaFile } from "@prisma/client";
import { userExcludeTransformer } from "./user";
import { mediasExcludeTransformer } from "./medias";

type FullCrowl = Crowl & {
    author?: User,
    medias?: MediaFile[],
    replies?: FullCrowl[],
    replied_to?: FullCrowl | null
}

type ExcludedBaseCrowl = Pick<Crowl, 'id' | 'text' | 'created_at' | 'updated_at'>

type ExcludedCrowl = ExcludedBaseCrowl & {
    author?: ReturnType<typeof userExcludeTransformer>,
    medias?: ReturnType<typeof mediasExcludeTransformer>
    replies?: ExcludedCrowl[]
    replied_to?: ExcludedCrowl | null
}

export const crowlExcludeTransformer = (crowl: FullCrowl): ExcludedCrowl => {
    return {
        id: crowl.id,
        text: crowl.text,
        medias: crowl.medias && mediasExcludeTransformer(crowl.medias),
        replies: crowl.replies && crowl.replies.map(crowlExcludeTransformer),
        author: crowl.author && userExcludeTransformer(crowl.author),
        replied_to: crowl.replied_to && crowlExcludeTransformer(crowl.replied_to),
        created_at: crowl.created_at,
        updated_at: crowl.updated_at
    };
};
