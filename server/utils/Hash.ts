import { hash, compare } from "bcrypt";

const saltRounds = 10;

export const hashPassword = (password: string): Promise<string> =>
    hash(password, saltRounds);

export const comparePasswords = (
    password: string,
    hashedPassword: string,
): Promise<boolean> => compare(password, hashedPassword);
