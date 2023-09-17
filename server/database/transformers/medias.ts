import { MediaFile } from "@prisma/client";

export const mediaExcludeTransformer = (media: MediaFile) => ({
    url: media.url,
    name: media.name,
    mime_type: media.mime_type,
    size: media.size,
});

export const mediasExcludeTransformer = (medias: MediaFile[]) =>
    medias.map(mediaExcludeTransformer);
