import { MAX_SIZE } from '~/constants/FILES'
import Yup from './mnemonicYupLocale'
import { FileJSON } from "formidable"


export const FormidableFileScheme = Yup.object<FileJSON>({
    size: Yup.number().integer().max(MAX_SIZE).required(),
    filepath: Yup.string().required(),
    newFilename: Yup.string().required(),
    mimetype: Yup.string().required(),
    mtime: Yup.date().required(),
    originalFilename: Yup.string().required(),
})

export type FormidableFileType = Yup.InferType<typeof FormidableFileScheme>