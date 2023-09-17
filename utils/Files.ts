import { useNotification } from "@kyvg/vue3-notification";
import { countPresence } from "./BaseUtils";
import {
    DEFAULT_UPLOAD_FILES_OPTION,
    IMAGE_TYPES,
    GIF_TYPES,
} from "~/constants/FILES";

export const isImage = (file: File | string) => {
    return IMAGE_TYPES.includes(typeof file === "string" ? file : file.type);
};

export const isGif = (file: File | string) => {
    return GIF_TYPES.includes(typeof file === "string" ? file : file.type);
};

export const arrayBufferToText = (arr: ArrayBuffer) => {
    const td = new TextDecoder();
    return td.decode(arr);
};

export const readImageFileAsDataUrl = (file: File) => {
    return new Promise<string>((resolve, reject) => {
        if (!isImage(file) && !isGif(file))
            return reject(
                new Error("Function readImageFile reads only images!"),
            );

        const fileReader = new FileReader();

        fileReader.onerror = () => reject(fileReader.error);

        fileReader.onload = () => {
            if (!fileReader.result)
                return reject(
                    new Error(
                        `Unexpected error occured while reading ${file.type}!`,
                    ),
                );

            if (fileReader.result instanceof ArrayBuffer)
                return resolve(arrayBufferToText(fileReader.result));

            resolve(fileReader.result);
        };

        fileReader.readAsDataURL(file);
    });
};

export const readImageAsUrlObject = (file: File) => URL.createObjectURL(file);
export const revokeObjectUrl = (url: string) => URL.revokeObjectURL(url);

export const readImageAsNameUrlArray = (files: File[]) => {
    const result: [string, string][] = [];

    for (const file of files) {
        const data = readImageAsUrlObject(file);
        result.push([file.name, data]);
    }

    return result;
};

export type isFilesSatisfiesCountOptions = {
    imageCount: number;
    gifCount: number;
    canBeUsedBoth: boolean;
};

export const isFilesSatisfiesCount = (
    files: FileList | File[],
    options: isFilesSatisfiesCountOptions = DEFAULT_UPLOAD_FILES_OPTION,
): boolean => {
    const types: string[] = [];

    for (const file of files) {
        types.push(file.type);
    }

    let imageCounter = 0;
    let gifCounter = 0;

    const { canBeUsedBoth, gifCount, imageCount } = options;

    for (const [key, value] of countPresence(types).entries()) {
        if (isImage(key)) imageCounter += value;

        if (isGif(key)) gifCounter += value;
    }

    // if image is more than needed
    if (imageCounter > imageCount) return false;

    // if gif is more than needed
    if (gifCounter > gifCount) return false;

    // if image and gif is more than zero but we not allowed to use them both at the same time
    if (!canBeUsedBoth && imageCounter > 0 && gifCounter > 0) return false;

    return true;
};

export const notifyMaxFileInfo = () => {
    const { canBeUsedBoth, gifCount, imageCount } = DEFAULT_UPLOAD_FILES_OPTION;

    const { notify } = useNotification();
    const {
        i18n: {
            global: { t },
        },
    } = useI18nConfig();

    notify({
        duration: 6000,
        type: "info",
        title: t("crowls.max_media_title"),
        text: t("crowls.max_media_info", {
            gifCount,
            imageCount,
            count: +canBeUsedBoth,
        }),
    });
};

export const getValidImageFiles = (input: HTMLInputElement): File[] | null => {
    const files = input.files;
    if (!files) return null;

    if (!isFilesSatisfiesCount(files)) {
        notifyMaxFileInfo();
        return null;
    }

    return Array.from(files);
};

export const mergeAndValidateImageFiles = (...args: (File | File[])[]) => {
    const files: File[] = [];

    args.forEach((el) => {
        if (Array.isArray(el)) return files.push(...el);

        files.push(el);
    });

    if (!isFilesSatisfiesCount(files)) {
        notifyMaxFileInfo();
        return null;
    }

    return files;
};

export const getMergedAndValidatedFiles = (
    target: HTMLInputElement,
    files: File[],
) => {
    const _files = getValidImageFiles(target);

    if (!_files) {
        target.value = "";
        return null;
    }

    const mergedFiles = mergeAndValidateImageFiles(files, _files);

    if (!mergedFiles) return null;

    return mergedFiles;
};

export const mapFilesToObjectsForValidation = (files: File[]) => {
    return files.map((file) => ({
        size: file.size,
        name: file.name,
        type: file.type,
    }));
};
