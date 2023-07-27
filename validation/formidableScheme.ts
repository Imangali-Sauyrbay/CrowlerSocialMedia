import * as Yup from "yup";
import "./mnemonicYupLocale";
import { FileJSON } from "formidable"

const maxSize = 100 * 1024 * 1024 // 100Mb
export const FormidableFileScheme = Yup.object<FileJSON>({
    size: Yup.number().integer().max(maxSize).required(),
    filepath: Yup.string().required(),
    newFilename: Yup.string().required(),
    mimetype: Yup.string().required(),
    mtime: Yup.date().required(),
    originalFilename: Yup.string().required(),
})

export type FormidableFileType = Yup.InferType<typeof FormidableFileScheme>