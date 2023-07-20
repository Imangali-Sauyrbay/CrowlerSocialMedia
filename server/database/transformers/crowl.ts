import { Crowl, User } from "@prisma/client";
import { userExcludeTransformer } from "./user";

export const crowlExcludeTransformer = (crowl: Crowl, author?: User) => {
    return {
        id: crowl.id,
        text: crowl.text,
        author: author && userExcludeTransformer(author)
    };
};
