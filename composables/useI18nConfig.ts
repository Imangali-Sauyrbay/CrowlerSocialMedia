import {
    DEFAULT_LOCALE,
    SUPPORTED_LOCALES,
    i18n,
    asyncSetLocale,
    getLocale,
    getLocaleFromStorage,
} from '~/plugins/i18n'

export const useI18nConfig = () => ({
    DEFAULT_LOCALE,
    SUPPORTED_LOCALES,
    i18n,
    asyncSetLocale,
    getLocale,
    getLocaleFromStorage,
})