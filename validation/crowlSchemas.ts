import Yup from './mnemonicYupLocale'
import { File } from "formidable"
import { FormidableFileScheme } from './formidableScheme'
import { FileScheme } from './fileSchemas'
import { MAX_CROWL_LENGTH } from '~/constants/FORMS'

const CrowlData = Yup.string().max(MAX_CROWL_LENGTH)

export const CrowlDataRequestScheme = Yup.object({
    text: CrowlData.when('media', {
        is: (media: Yup.InferType<typeof FileScheme>[]) => !media || media.length === 0,
        then: (schema) => schema.required(),
        otherwise: (schema) => schema.optional()
    }),
    
    media: Yup.array().of(FileScheme).required()
});

export const CrowlDataScheme = Yup.object({
    text: Yup.array().of(CrowlData).nullable(),
});

export type CrowlDataServerRequest = Yup.InferType<typeof CrowlDataScheme> 

export const CrowlFilesScheme = Yup.object({
    media: Yup.mixed<File[]>().test('media', 'invalid', (value) => {
        if(! value) return true
        return Yup.array().of(FormidableFileScheme).isValidSync( value.map(v => v.toJSON()) )
    })
});