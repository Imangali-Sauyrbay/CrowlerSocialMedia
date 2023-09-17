import { H3EventContext } from "h3";
import { User } from "@prisma/client";

export const getUserFromContext = (context: H3EventContext): User => {
    const user: User | undefined = context.user;
    if (!user) throw context.error || createNotAuthorizedError();

    return user;
};

export const checkIfUserAuthorized = (context: H3EventContext) => {
    if (!context.user) throw context.error || createNotAuthorizedError();
};
