export type ValueOf<T> = T extends readonly any[] ? T[number] : never;
export type Pretify<T extends object> = { [P in keyof T]: T[keyof T] } & {};
