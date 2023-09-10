import {type Schema} from 'yup'

export const useValidatorWrapper = () => {
    const validator = useValidator()

    const handleFetchError = (error: unknown, variables: object) => {
        if(isValidationErrorResponce(error)) {
            validator.setAllErrors(error?.data?.data || {}, variables)
        }
    }

    const combineWithValidator = <T extends object, S extends Schema>(toCombineWith: T, schema: S) => ({
        ...toCombineWith,
        validator: {
            ...validator,
            validated: (data: object) => validator.validated(schema, data)
        }
    })

    return {
        validator,
        handleFetchError,
        combineWithValidator
    }
}