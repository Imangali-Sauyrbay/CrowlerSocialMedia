import { prisma } from "./index"

export type Crowl = {
    text: string,
    author_id: number,
}

export type File = {
    size: number,
    filepath: string,
    newFilename: string,
    mimetype: string,
    mtime: string,
    originalFilename: string,
}

export type Files = Record<string, File[]>

export type NewCrowlData = [Crowl, Files]

export const createCrowl = (data: Crowl) => {
    return prisma.crowl.create({
        data,
    })
}