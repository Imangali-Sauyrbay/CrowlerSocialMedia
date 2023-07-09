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

export const getRefreshTokenByToken = (token: string, includeUser = true) => {
    return prisma.refreshToken.findUnique({
        where: {
            token,
        },

        include: {
            user: includeUser
        }
    })
}


export const deleteRefreshTokenByID = (id: number) => {
    return prisma.refreshToken.delete({ where: { id } })
}