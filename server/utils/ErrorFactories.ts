import { StatusCodes, ReasonPhrases } from "http-status-codes";

export const createValidationError = (error: object) =>
    createError({
        data: error,
        message: "ValidationError",
        statusCode: StatusCodes.BAD_REQUEST,
        statusMessage: ReasonPhrases.BAD_REQUEST,
    });

export const createUserAlreadyExistsError = () =>
    createError({
        data: {
            username: "taken",
        },

        statusCode: StatusCodes.CONFLICT,
        statusMessage: ReasonPhrases.CONFLICT,
    });

export const createUserNotExistsError = () =>
    createValidationError({
        username: "not-exists",
    });

export const createPasswordNotMatchError = () =>
    createValidationError({
        password: "not-match",
    });

export const createFailedToCreateError = (toCreate: string) =>
    createError({
        data: {
            message: "failed-to-create:" + toCreate,
        },
        message: "failed-to-create:" + toCreate,
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        statusMessage: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });


export const createNotAuthorizedError = (message: string = "NotAuthorized") =>
    createError({
        message,
        statusCode: StatusCodes.UNAUTHORIZED,
        statusMessage: ReasonPhrases.UNAUTHORIZED,
    });

export const createFailedToRetrieveError = (toRetrieve: string) =>
    createError({
        data: {
            message: "failed-to-retrieve:" + toRetrieve,
        },
        message: "failed-to-retrieve:" + toRetrieve,
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        statusMessage: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });