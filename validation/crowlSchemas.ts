import * as Yup from "yup";
import "./mnemonicYupLocale";
import { File, FileJSON } from "formidable"

export const CrowlDataScheme = Yup.object({
    text: Yup.array().of(Yup.string().min(6).required()).required(),
});

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

export const CrowlFilesScheme = Yup.object({
    medias: Yup.mixed<File | File[]>().test('media', 'invalid', (value) => {
        if(! value) return true

        return Array.isArray(value)
        ? Yup.array().of(FormidableFileScheme).isValidSync( value.map(v => v.toJSON()) )
        : FormidableFileScheme.isValidSync( value.toJSON() )
    })
});

