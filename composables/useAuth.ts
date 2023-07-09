import { type LoginRequest } from '~/validation/authSchemas'
import { type User } from "@prisma/client"
import { FetchError } from 'ofetch'
import { StatusCodes } from "http-status-codes";


export type ExcludedUser = Omit<User, 'password' | 'created_at' | 'updated_at'>
export type AuthResponce = {
    access_token: string,
    user: ExcludedUser
}

export const useAuth = () => {
    const useAuthToken = () => useState<string>('auth:token')
    const useAuthUser = () => useState<ExcludedUser>('auth:user')
    const useAuthInitializing = () => useState<boolean>('auth:initializing', () => true)
    const useRefreshTimeoutID = () => useState<number>('auth:refresh-timeout')

    const setToken = (value: string) => useAuthToken().value = value
    const setUser = (value: ExcludedUser) => useAuthUser().value = value
    const setAuthInitializing = (value: boolean) => useAuthInitializing().value = value

    const setAuthResponce = (data: AuthResponce) => {
        setToken(data.access_token)
        setUser(data.user)
        return data
    }

    const login = async (body: LoginRequest) => {
        return setAuthResponce(await $fetch<AuthResponce>('/api/auth/login', {
            method: 'POST',
            body
        }))
    }

    const refreshToken = async () => {
        const res = await $fetch<AuthResponce & {exp: number}>('/api/auth/refresh')
        setAuthResponce(res)
        return res
    }

    const setTimerToRefresh = (timestamp: number) => {
        const timeoutID = useRefreshTimeoutID()
        const halfMinute = 30 * 1000
        const time = timestamp - Date.now() - halfMinute

        if(process.client) {
            window.clearTimeout(timeoutID.value)
            timeoutID.value = window.setTimeout(async () => {
                const responce = await refreshToken()
    
                if(typeof responce.exp === 'number')
                    setTimerToRefresh(responce.exp)
            }, time)
        }
    }

    const initAuth = async () => {
        try {
            setAuthInitializing(true)
            const responce = await refreshToken()

            if(typeof responce.exp === 'number')
                setTimerToRefresh(responce.exp)
        } catch (e) {
            if(e instanceof FetchError && e.status === StatusCodes.UNAUTHORIZED) {
                return
            }

            console.error(e)
        } finally {
            setAuthInitializing(false)
        }
    }

    return {
        login,
        setToken,
        setUser,
        useAuthToken,
        useAuthUser,
        initAuth,
        useAuthInitializing
    }
}

function translateToSalty(text: string) {
    let result = ''
    const vowels = 'аяуюоеёэиы'

    for(let i = 0; i < text.length; i++) {
        const char = text.charAt(i)

        result += char

        if(vowels.includes(char)) {
            result += 'c' + char
        }
    }

    return result
}
