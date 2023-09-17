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

export const isIsoDate = (str: string) => {
    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false;

    const date = new Date(str);

    return (
        date instanceof Date &&
        !isNaN(date.getTime()) &&
        date.toISOString() === str
    );
};

export const getTimeComponents = (time: number) => {
    const millisecondsPerSecond = 1000;
    const millisecondsPerMinute = millisecondsPerSecond * 60;
    const millisecondsPerHour = millisecondsPerMinute * 60;
    const millisecondsPerDay = millisecondsPerHour * 24;
    const millisecondsPerWeek = millisecondsPerDay * 7;
    const millisecondsPerMonth = millisecondsPerDay * 30.44; // Approximate value for a month
    const millisecondsPerYear = millisecondsPerDay * 365.25; // Approximate value for a year

    const years = Math.floor(time / millisecondsPerYear);
    time %= millisecondsPerYear;

    const months = Math.floor(time / millisecondsPerMonth);
    time %= millisecondsPerMonth;

    const weeks = Math.floor(time / millisecondsPerWeek);
    time %= millisecondsPerWeek;

    const days = Math.floor(time / millisecondsPerDay);
    time %= millisecondsPerDay;

    const hours = Math.floor(time / millisecondsPerHour);
    time %= millisecondsPerHour;

    const minutes = Math.floor(time / millisecondsPerMinute);
    time %= millisecondsPerMinute;

    const seconds = Math.floor(time / millisecondsPerSecond);

    return {
        years,
        months,
        weeks,
        days,
        hours,
        minutes,
        seconds,
    };
};

export const HRDate = (date: string) => {
    if (!isIsoDate(date))
        throw new Error("Expected ISO string, but got: " + date);

    const {
        i18n: {
            global: { t },
        },
    } = useI18nConfig();

    const milliseconds = new Date(date).getTime();
    const now = Date.now();

    const pastTime = now - milliseconds;

    const { seconds, minutes, hours, days, weeks, months, years } =
        getTimeComponents(pastTime);

    if (years > 0) {
        return t("past_time.years", years);
    }

    if (months > 0) {
        return t("past_time.months", months);
    }

    if (weeks > 0) {
        return t("past_time.weeks", weeks);
    }

    if (days > 0) {
        return t("past_time.days", days);
    }

    if (hours > 0) {
        return t("past_time.hours", hours);
    }

    if (minutes > 0) {
        return t("past_time.minutes", minutes);
    }

    return t("past_time.seconds", seconds);
};
