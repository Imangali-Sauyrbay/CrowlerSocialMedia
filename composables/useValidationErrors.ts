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

import {type Schema} from 'yup'

interface ValidatorOptions {
    shouldLocalize?: boolean
}

const defaultOptions: ValidatorOptions = {
    shouldLocalize: true
}

export const useValidator = (options: ValidatorOptions = {}) => {
    const validationErrors = ref<([string, string])[]>()
    const unrecognizedFieldsErrors = ref<string[]>()

    const setErrors = (e: Record<string, string> | Map<string, string>) => {
        if(!(e instanceof Map)) {
            e = new Map(Object.entries(e));
        }

        validationErrors.value = useValidationErrorsLocalizer(e, options.shouldLocalize)
    }

    const setUnrecognizedFields = (data: object) => {
        const keys = Object.keys({...data})
        const result: string[] = []
        
        validationErrors.value?.forEach(([key, value]) => {
            if(!keys.includes(key))
                result.push(value)
        })
        
        unrecognizedFieldsErrors.value = result
    }

    const setAllErrors = (e: Record<string, string> | Map<string, string>, data: object) => {
        setErrors(e)
        setUnrecognizedFields(data)
    }

    options = Object.assign(defaultOptions, options)

    const validated = <T extends Schema>(schema: T, data: object): T['__outputType'] | null => {
        validationErrors.value = [];

        try {
            return schema.validateSync({...data}, { abortEarly: false })
        } catch(e) {
            if(!isValidationError(e)) return null
            const validationError = getValidationMessages(e)
            
            setErrors(validationError)
            setUnrecognizedFields(data)
        }

        return null
    }

    return {
        validationErrors,
        unrecognizedFieldsErrors,
        setErrors,
        validated,
        setUnrecognizedFields,
        setAllErrors
    }
}