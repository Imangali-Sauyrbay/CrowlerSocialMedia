export type ValueOf<T> = T extends readonly any[] ? T[number] : never;
