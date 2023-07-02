import { User } from "@prisma/client";

export const userExcludeTransformer = (user: User) => {
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        username: user.username,
        profile: user.profile,
    };
};
