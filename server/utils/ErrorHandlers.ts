import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { ValidationError } from "yup";
import { createValidationError } from "~/server/utils/ErrorFactories";

export const validationErrorHandler = (e: unknown) => {
    if (!(e instanceof ValidationError)) return null;

    const errors = e as ValidationError;

    const validationErrors: Record<string, string> = {};

    errors.inner.forEach((error) => {
        const { path, message } = error;

        if (message.startsWith("no-unknown-keys:") && !path)
            validationErrors["unknown-fields"] = message;

        if (path) validationErrors[path] = message;
    });

    return validationErrors;
};

export const defaultErrorHandler = (e: unknown) => {
    const validationError = validationErrorHandler(e);

    if (validationError) return createValidationError(validationError);

    return createError({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        statusMessage: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
};
