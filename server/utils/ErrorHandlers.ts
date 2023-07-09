import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { ValidationError } from "yup";
import { createValidationError } from "~/server/utils/ErrorFactories";
import { convertMapToRecord } from "~/utils/BaseUtils";

export const validationErrorHandler = (e: unknown) => {
    if (!(e instanceof ValidationError)) return null;

    const errors = e as ValidationError;
    const validationErrors: Map<string, string> = new Map();
    
    if(errors.inner.length === 0 && errors.path) {
        validationErrors.set(errors.path, errors.message)
        return validationErrors;
    }
    
    errors.inner.forEach((error) => {
        const { path, message } = error;

        if (message.startsWith("no-unknown-keys:") && !path)
            validationErrors.set("unknown-fields", message);

        if (path) validationErrors.set(path, message);
    });

    return validationErrors;
};

export const defaultErrorHandler = (e: unknown) => {
    const validationError = validationErrorHandler(e);
    
    if (validationError) return createValidationError(convertMapToRecord(validationError));

    return createError({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        statusMessage: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
};
