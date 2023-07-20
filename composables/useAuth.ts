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

const isUnauthorized = (e: unknown) => e instanceof FetchError && e.status === StatusCodes.UNAUTHORIZED

export const useAuth = () => {
    const useAuthToken = () => useState<string | null>('auth:token')
    const useAuthUser = () => useState<ExcludedUser | null>('auth:user')

    const useAuthInitializing = () => useState<boolean>('auth:initializing', () => true)
    const useRefreshTimeoutID = () => useState<number>('auth:refresh-timeout')

    const setUser = (value: UnwrapRef<ReturnType<typeof useAuthUser>>) => useAuthUser().value = value
    const setToken = (value: string | null) => useAuthToken().value = value
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
        const msHalfMinute = 30 * 1000
        const msToWait = timestamp - Date.now()
        const time = msToWait - msHalfMinute

        if(process.client) {
            window.clearTimeout(timeoutID.value)
            timeoutID.value = window.setTimeout(async () => {
                try {
                    const responce = await refreshToken()
    
                    if(typeof responce.exp === 'number')
                        setTimerToRefresh(responce.exp)
                } catch (e) {
                    if(isUnauthorized(e)) {
                        setUser(null)
                        setToken(null)
                    }
                }
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
            if(isUnauthorized(e)) {
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
