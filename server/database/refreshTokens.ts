import { User } from "@prisma/client";
import { prisma } from ".";

export const createRefreshToken = (token: string, user: User) => {
    return prisma.refreshToken.create({
        data: {
            token,
            user_id: user.id,
        },
    });
};
