import { type LoginRequest } from '~/validation/authSchemas'
import { type User } from "@prisma/client"
import { FetchError } from 'ofetch'
import { StatusCodes } from "http-status-codes";
import type {UnwrapRef} from 'vue-demi'

export type ExcludedUser = Omit<User, 'password' | 'created_at' | 'updated_at'>
export type AuthResponce = {
    access_token: string,
    user: ExcludedUser
}
export type RefreshResponce = AuthResponce & {exp: number}

const isUnauthorizedError = (e: unknown) => e instanceof FetchError && e.status === StatusCodes.UNAUTHORIZED

const useAuthToken = () => useState<string | null>('auth:token')
const useAuthUser = () => useState<ExcludedUser | null>('auth:user')

const useAuthInitializing = () => useState<boolean>('auth:initializing', () => true)
const useRefreshTimeoutID = () => useState<number>('auth:refresh-timeout')

const setUser = (value: UnwrapRef<ReturnType<typeof useAuthUser>>) => useAuthUser().value = value
const setToken = (value: string | null) => useAuthToken().value = value
const setAuthInitializing = (value: boolean) => useAuthInitializing().value = value

const setAuthResponce = <T extends AuthResponce>(data: T): T => {
    setToken(data.access_token)
    setUser(data.user)
    return data
}

const login = async (body: LoginRequest) => {
    return setAuthResponce(
        await $fetch<AuthResponce>('/api/auth/login', {
            method: 'POST',
            body
        })
    )
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
    setToken,
    setUser,
    useAuthToken,
    useAuthUser,
    initAuth,
    useAuthInitializing
})
