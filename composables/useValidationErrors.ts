export const useValidationErrorsLocalizer = (errors: Map<string, string>, shouldLocalize: boolean = true): ([string, string])[] => {
    const localizeError = useValidationMnemonicLocalizer()
    const { i18n } = useI18nConfig()

    const result: ([string, string])[] = [];

    for (const [key, value] of errors.entries()) {
        const path = 'validation.fields.' + key
        const localizedValue =  i18n.global.t(path)

        result.push([
            key,
            shouldLocalize
            ? localizeError(
                value,
                localizedValue !== path
                ? localizedValue
                : undefined
            )
            : value
        ])
    }

    return result;
}

import {type ISchema} from 'yup'
import { validationErrorHandler } from '~/server/utils/ErrorHandlers';

interface ValidatorOptions {
    shouldLocalize?: boolean
}

const defaultOptions: ValidatorOptions = {
    shouldLocalize: true
}

export const useValidator = (options: ValidatorOptions = {}) => {
    const errors = ref<([string, string])[]>()

    options = Object.assign(defaultOptions, options)

    const validated = async <T extends ISchema<any>>(schema: T, data: object): Promise< ReturnType<T['validate']> | null> => {
        errors.value = [];

        try {
            return await schema.validate({...data}, { abortEarly: false })
        } catch(e) {
            const validationError = validationErrorHandler(e)
    
            if(validationError) {
                errors.value = useValidationErrorsLocalizer(validationError, options.shouldLocalize)
            }
    
            return null
        }
    }

    const setErrors = (e: Record<string, string> | Map<string, string>) => {
        if(!(e instanceof Map)) {
            e = new Map(Object.entries(e));
        }

        errors.value = useValidationErrorsLocalizer(e, options.shouldLocalize)
    }

    return {
        errors,
        setErrors,
        validated
    }
}