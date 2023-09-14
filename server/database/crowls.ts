import { Prisma } from "@prisma/client"
import { prisma } from "./index"

export type Crowl = {
    text: string,
    author_id: number,
    reply_to_id?: number
}

type FindCrowlParams = Parameters<typeof prisma.crowl.findMany>[0]

export const createCrowl = (data: Crowl) => {
    return prisma.crowl.create({
        data,
    })
}

const defaultIncluded: Prisma.CrowlInclude = {
    medias: true,
    replied_to: {
        include: {
            author: true,
            medias: true
        }
    }
}

type IGetCrowlByIdOptions = {
    includeDefault?: boolean,
    include?: Prisma.CrowlInclude
}

export const getCrowlById = (id: number, options: IGetCrowlByIdOptions = {}) => {
    const {include, includeDefault} = options

    const toInclude: FindCrowlParams = includeDefault
    ? {include: defaultIncluded}
    : include
        ? {include}
        : {}

    return prisma.crowl.findFirst({
        where: {
            id,
        },

        ...toInclude,
    })
}

type IGetCrowlsOptions = {
    params?: FindCrowlParams
    includeDefaults?: boolean
    shouldPaginate?: boolean
    page?: number
    perPage?: number,
}

export const getCrowlsPageCount = async (perPage: number = 10) => {
    const crowlCount = await prisma.crowl.count()
    return Math.ceil(crowlCount / perPage)
}
export const getCrowls = (options: IGetCrowlsOptions = {}) => {
    const {
        page = 1,
        params = {},
        perPage = 10,
        includeDefaults,
        shouldPaginate
    } = options

    const pagination = shouldPaginate? {
        skip: (perPage * page) - perPage,
        take: perPage
    } : {}

    const defaultOptions: FindCrowlParams = includeDefaults ? {
        orderBy: {
            created_at: 'desc'
        },

        include: {
            author: true,
            medias: true,
        }
    } : {}

    return prisma.crowl.findMany({
        ...pagination,
        ...defaultOptions,
        ...params
    })
}