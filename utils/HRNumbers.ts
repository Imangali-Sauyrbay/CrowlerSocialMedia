const POSTFIXES = new Map<number, string>([
    [24, "Y"],
    [21, "Z"],
    [18, "E"],
    [15, "P"],
    [12, "T"],
    [9, "G"],
    [6, "M"],
    [3, "k"],
    [0, ""],
    [-3, "m"],
    [-6, "µ"],
    [-9, "n"],
    [-12, "p"],
    [-15, "f"],
    [-18, "a"],
    [-21, "z"],
    [-24, "y"],
]);

const getExponent = (n: number) => {
    if (n === 0) return n;

    return Math.floor(Math.log10(Math.abs(n)));
};

export const HRNumbersScientific = (n: number) => {
    const numbersToShow = 3;
    const precised = precise(n, numbersToShow);
    const e = clamp(3 * Math.floor(getExponent(precised) / 3), -24, 24);
    return (
        precise(n / Math.pow(10, e), numbersToShow).toString() +
            POSTFIXES.get(e) || ""
    );
};

export const HRNumbers = (num: number): string => {
    const suffixes = ["", "k", "M", "B"];
    const magnitude = Math.floor(Math.log10(num) / 3);

    if (magnitude === 0) {
        return num.toString();
    }

    const scaledNum = num / Math.pow(10, magnitude * 3);

    const formattedNum = toFixedWithoutRound(scaledNum, magnitude > 0 ? 1 : 0);

    const suffix = suffixes[magnitude] || "";

    return formattedNum + suffix;
};
