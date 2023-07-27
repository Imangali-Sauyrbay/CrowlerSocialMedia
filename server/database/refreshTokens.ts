import { User } from "@prisma/client";
import { prisma } from ".";

export const createRefreshToken = (token: string, user: User) => {
    const now = new Date()
    now.setUTCHours(now.getUTCHours() + 4)
    
    return prisma.refreshToken.create({
        data: {
            token,
            user_id: user.id,
            expires_at: now
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

export const deleteExpiredRefreshTokens = () => {
    return prisma.refreshToken.deleteMany({
        where: {
            expires_at: {
                lt: new Date()
            }
        }
    })
}