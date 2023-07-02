export const toFixedWithoutRound = (n: number, fractionDigits: number) =>
    Math.trunc(n * Math.pow(10, fractionDigits)) / Math.pow(10, fractionDigits);
export const clamp = (n: number, min: number, max: number) =>
    Math.max(Math.min(n, max), min);
export const precise = (n: number, precision: number) =>
    Number.parseFloat(n.toPrecision(precision));