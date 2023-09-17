import { RegisterRequest, type LoginRequest } from '~/validation/authSchemas'
import { type User } from "@prisma/client"
import { FetchError } from 'ofetch'
import { StatusCodes } from "http-status-codes";
import type {UnwrapRef} from 'vue-demi'

export type ExcludedUser = Omit<User, 'password' | 'created_at' | 'updated_at'>
export interface AuthResponce {
    user: ExcludedUser
}

export interface LoginResponce extends AuthResponce {
    access_token: string
}

export interface RegisterResponce extends AuthResponce {
    success: boolean
}

export interface RefreshResponce extends LoginResponce {exp: number}

const isUnauthorizedError = (e: unknown) => e instanceof FetchError && e.status === StatusCodes.UNAUTHORIZED

export const useAuthToken = () => useState<string | null>('auth:token')
export const useAuthUser = () => useState<ExcludedUser | null>('auth:user')
export const useDefaultLogo = () => {
    const defaultLogo = useState<string>('default:profile', () => '/assets/images/default-logo.png')

    const withDefaultLogo = (logo: string | null | undefined): string => logo || defaultLogo.value

    return {
        defaultLogo,
        withDefaultLogo
    }
}

const useAuthInitializing = () => useState<boolean>('auth:initializing', () => true)
const useRefreshTimeoutID = () => useState<number>('auth:refresh-timeout')

const setUser = (value: UnwrapRef<ReturnType<typeof useAuthUser>>) => useAuthUser().value = value
const setToken = (value: string | null) => useAuthToken().value = value
const setAuthInitializing = (value: boolean) => useAuthInitializing().value = value

const setAuthResponce = <T extends LoginResponce>(data: T): T => {
    setToken(data.access_token)
    setUser(data.user)
    return data
}

const login = async (body: LoginRequest) => {
    return setAuthResponce(
        await $fetch<LoginResponce>('/api/auth/login', {
            method: 'POST',
            body
        })
    )
}

const logout = async () => {
    await useFetchApi('/api/auth/logout', {
        method: 'POST'
    })

    setToken(null)
    setUser(null)
}

const register = (body: RegisterRequest) => {
    return $fetch<RegisterResponce>('/api/auth/register', {
        method: 'POST',
        body
    })
}

const refreshToken = async () => {
    return setAuthResponce(
        await $fetch<RefreshResponce>('/api/auth/refresh')
    )
}

const setTimerToRefreshToken = (timestamp: number) => {
    const msHalfMinute = 30 * 1000

    const timeoutID = useRefreshTimeoutID()
    
    const msFullTimeToWait = timestamp - Date.now()

    const timeToWait = msFullTimeToWait - msHalfMinute

    if(process.client) {
        window.clearTimeout(timeoutID.value)
        timeoutID.value = window.setTimeout(async () => {
            try {
                const responce = await refreshToken()

                if(typeof responce.exp === 'number')
                    setTimerToRefreshToken(responce.exp)
            } catch (e) {
                if(isUnauthorizedError(e)) {
                    setUser(null)
                    setToken(null)
                }
            }
        }, timeToWait)
    }
}

const initAuth = async () => {
    try {
        setAuthInitializing(true)
        const responce = await refreshToken()

        if(typeof responce.exp === 'number')
            setTimerToRefreshToken(responce.exp)
    } catch (e) {
        if(isUnauthorizedError(e)) {
            return;
        }
    } finally {
        setAuthInitializing(false)
    }
}

export const useAuth = () => ({
    login,
    logout,
    register,
    setToken,
    setUser,
    useAuthToken,
    useAuthUser,
    initAuth,
    useAuthInitializing
})
