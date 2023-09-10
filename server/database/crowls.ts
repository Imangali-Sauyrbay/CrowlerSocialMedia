import { prisma } from "./index"

export type Crowl = {
    text: string,
    author_id: number,
}

export const createCrowl = (data: Crowl) => {
    return prisma.crowl.create({
        data,
    })
}

export const getCrowlById = (id: number, page: number=1, perPage:number=10) => {
    const skip = (perPage * page) - perPage
    const take = perPage

    return prisma.crowl.findFirst({
        where: {
            id,
        },

        include: {
            author: true,
            medias: true,

            replies: {
                include: {
                    author: true,
                    medias: true
                },

                skip,
                take
            },
            
            replied_to: {
                include: {
                    author: true,
                    medias: true
                }
            }
        }
    })
}

export const getCrowls = (page: number=1, perPage:number=10) => {
    const skip = (perPage * page) - perPage
    const take = perPage

    return prisma.crowl.findMany({
        skip,
        take,
        include: {
            author: true,
            medias: true,

            replies: {
                include: {
                    author: true,
                    medias: true
                },

                skip,
                take
            },
            
            replied_to: {
                include: {
                    author: true,
                    medias: true
                }
            }
        }
    })
}