/* eslint-disable */
import * as Yup from "yup";
import { type LocaleObject, printValue } from "yup";

export const locale: LocaleObject = {
    array: {
        max: "max-array:${max}",
        min: "min-array:${min}",
        length: "length-array:${length}",
    },

    boolean: {
        isValue: "expect:${value}",
    },

    object: {
        noUnknown: "no-unknown-keys:${unknown}",
    },

    date: {
        max: "max-date:${max}",
        min: "min-date:${min}",
    },

    number: {
        max: "max-number:${max}",
        min: "min-number:${min}",
        lessThan: "less-than:${less}",
        moreThan: "more-than:${more}",
        positive: "positive",
        negative: "negative",
        integer: "integer",
    },

    string: {
        length: "length-string:${length}",
        max: "max-string:${max}",
        min: "min-string:${min}",
        matches: "match:${regex}",
        email: "email",
        url: "url",
        trim: "trim",
        lowercase: "lowercase",
        uppercase: "uppercase",
    },

    mixed: {
        default: "error",
        required: "required",
        oneOf: "one-of:${values}",
        notOneOf: "not-one-of:${values}",
        defined: "defined",
        notNull: "not-null",
        notType: ({ path, type, value, originalValue }) => {
            const castMsg =
                originalValue != null && originalValue !== value
                    ? ` (cast from the value \`${printValue(
                          originalValue,
                          true
                      )}\`).`
                    : ".";

            return type !== "mixed"
                ? `${path} must be a \`${type}\` type, ` +
                      `but the final value was: \`${printValue(
                          value,
                          true
                      )}\`` +
                      castMsg
                : `${path} must match the configured type. ` +
                      `The validated value was: \`${printValue(
                          value,
                          true
                      )}\`` +
                      castMsg;
        },
    },
};

Yup.setLocale(locale);

export default Yup;