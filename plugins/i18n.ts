import { createI18n } from 'vue-i18n'
import { type ValueOf } from '~/utils/TS'
import enUS from '~/locales/en-US.json'

export type Locale = ValueOf<typeof SUPPORTED_LOCALES>

export const SUPPORTED_LOCALES = ['en-US', 'ru-RU'] as const
export const DEFAULT_LOCALE: Locale = 'en-US'
const STORAGE_KEY = 'language'
const COOKIE_KEY = STORAGE_KEY

export const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: DEFAULT_LOCALE,
    fallbackLocale: DEFAULT_LOCALE,
})

const loadLocale = async (lang: Locale) => {
    const messages = await import(`~/locales/${lang}.json`)
    i18n.global.setLocaleMessage(lang, messages.default)
}

const saveLocale = (lang: Locale) => {
    i18n.global.locale.value = lang
    
    document.documentElement.lang = lang
    
    localStorage.setItem(STORAGE_KEY, lang)

    const expirationDate = new Date()
    expirationDate.setFullYear(expirationDate.getFullYear() + 1)
    document.cookie = `${COOKIE_KEY}=${lang}; expires=${expirationDate.toUTCString()}`
}

export const getLocale = (): Locale => {
    return i18n.global.locale.value as Locale
}

export const getLocaleFromStorage = (): Locale => {
    return localStorage.getItem(STORAGE_KEY) as Locale
}

export const asyncSetLocale = async (lang: Locale) => {
    if (!SUPPORTED_LOCALES.includes(lang)) return false

    if (!i18n.global.availableLocales.includes(lang)) {
        await loadLocale(lang)
    }
    
    saveLocale(lang)
    
    await nextTick()
    
    return true
}

export default defineNuxtPlugin(({ vueApp }) => {
    i18n.global.setLocaleMessage(DEFAULT_LOCALE, enUS)
    
    if(process.client) {
        const { registerAsyncFirstLoad } = useFirstLoaderBus()
        if(getLocaleFromStorage() !== DEFAULT_LOCALE) registerAsyncFirstLoad(asyncSetLocale(getLocaleFromStorage()))
        else saveLocale(DEFAULT_LOCALE)
    }

    if(process.server) {
        const lang = useCookie(COOKIE_KEY)

        if (SUPPORTED_LOCALES.includes(lang.value as Locale)) {
            loadLocale(lang.value as Locale).then(() => nextTick())
            i18n.global.locale.value = lang.value as Locale
        }
    }

    vueApp.use(i18n)
})