import { MediaFile } from "@prisma/client"

export const mediaExcludeTransformer = (media: MediaFile) => ({
    url: media.url,
    name: media.name,
    mime_type: media.mime_type,
    size: media.size,
    file_path: media.file_path,
    provider_public_id: media.provider_public_id,
    created_at: media.created_at,
    updated_at: media.updated_at
})

export const mediasExcludeTransformer = (medias: MediaFile[]) => medias.map(mediaExcludeTransformer)