import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { ValidationError } from "yup";
import { createValidationError } from "~/server/utils/ErrorFactories";
import { H3Error } from 'h3'

export const validationErrorHandler = (e: unknown): H3Error | null => {
    if (!(e instanceof ValidationError)) return null;

    const errors = e as ValidationError;
    const validationErrors: Record<string, string> = {};
    
    if(errors.inner.length === 0 && errors.path) {
        validationErrors[errors.path] = errors.message;
        return createValidationError(validationErrors);
    }
    
    errors.inner.forEach((error) => {
        const { path, message } = error;

        if (message.startsWith("no-unknown-keys:") && !path)
            validationErrors["unknown-fields"] = message;

        if (path) validationErrors[path] = message;
    });

    return createValidationError(validationErrors);
};

export const defaultErrorHandler = (e: unknown) => {
    const validationError = validationErrorHandler(e);
    
    if (validationError) return validationError;

    return createError({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        statusMessage: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
};

type ErrorHandlerCallback = (e: unknown) => H3Error | null | undefined

export const withErrorHandlers = (errorHandlers: ErrorHandlerCallback[]) => 
(e: unknown): H3Error => {
    for (let i = 0; i < errorHandlers.length; i++) {
        const result = errorHandlers[i](e);
        
        if(result) return result
    }

    return defaultErrorHandler(e)
}