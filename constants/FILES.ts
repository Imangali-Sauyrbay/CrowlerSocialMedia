import { isFilesSatisfiesCountOptions } from "~/utils/Files";

export const DEFAULT_UPLOAD_FILES_OPTION: Readonly<isFilesSatisfiesCountOptions> =
    {
        canBeUsedBoth: false,
        gifCount: 1,
        imageCount: 4,
    };

export const IMAGE_TYPES: Readonly<string[]> = [
    "image/png",
    "image/jpeg",
    "image/webp",
];
export const GIF_TYPES: Readonly<string[]> = ["image/gif"];

export const MAX_SIZE = 10_485_750; // 10Mb
