import * as Yup from "yup";
import "./mnemonicYupLocale";
import { File } from "formidable"
import { FormidableFileScheme } from './formidableScheme'

export const CrowlDataScheme = Yup.object({
    text: Yup.array().of(Yup.string().min(6).required()).required(),
});

export const CrowlFilesScheme = Yup.object({
    medias: Yup.mixed<File | File[]>().test('media', 'invalid', (value) => {
        if(! value) return true

        return Array.isArray(value)
        ? Yup.array().of(FormidableFileScheme).isValidSync( value.map(v => v.toJSON()) )
        : FormidableFileScheme.isValidSync( value.toJSON() )
    })
});
