import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { H3Error } from 'h3'
import { createValidationError } from "~/server/utils/ErrorFactories";
import { getValidationMessages, isValidationError } from "../../utils/validationUtils";

export const validationErrorHandler = (e: unknown): H3Error | null => {
    if (!isValidationError(e)) return null;
    console.log(getValidationMessages(e))
    return createValidationError(getValidationMessages(e));
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