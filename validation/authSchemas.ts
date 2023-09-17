import Yup from "./mnemonicYupLocale";

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

export const RegistrationSchema = Yup.object({
    username: Yup.string().min(6).required(),
    name: Yup.mixed<string>().test(
        "is-string-and-min-length",
        "min-string:6",
        function (value) {
            return typeof value !== "string" || value.length === 0
                ? true
                : value.length >= 6;
        },
    ),
    email: Yup.string().matches(emailRegex, "email").required(),
    password: Yup.string()
        .min(8)
        .matches(/[A-ZА-ЯЁ]/, "must-contain:uppercase")
        .matches(/\d/, "must-contain:number")
        .matches(/[!@#$%^&*_-]/, "must-contain:special-character,-!@#$%^&*_")
        .required(),
    password_confirm: Yup.string()
        .oneOf([Yup.ref("password")], "confirm-not-match")
        .required(),
});

export type RegisterRequest = Yup.InferType<typeof RegistrationSchema>;
export const LoginSchema = RegistrationSchema.pick(["username", "password"]);
export type LoginRequest = Yup.InferType<typeof LoginSchema>;
