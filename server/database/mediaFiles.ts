import { MediaFile } from "@prisma/client";
import { prisma } from ".";

export type File = {
    size: number;
    filepath: string;
    newFilename: string;
    mimetype: string;
    mtime: string;
    originalFilename: string;
};

export type Files = Record<string, File[]>;

type ICreateMediaFile = Omit<
    MediaFile,
    "created_at" | "id" | "updated_at" | "user_id"
>;

export const createMediaFile = (data: ICreateMediaFile) => {
    return prisma.mediaFile.create({
        data,
    });
};
