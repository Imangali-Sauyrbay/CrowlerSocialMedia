import { FetchError } from 'ofetch'

export interface ErrorAPIData {
    url:           string;
    statusCode:    number;
    statusMessage: string;
    message:       string;
    stack:         string;
    data:          Record<string, string>;
}

export const isValidationError = (e: unknown) => {
    return e instanceof FetchError &&
    (e.data as ErrorAPIData).message === 'ValidationError';
}