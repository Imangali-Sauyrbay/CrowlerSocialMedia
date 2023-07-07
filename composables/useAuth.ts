import { type LoginRequest } from '~/validation/authSchemas'
import { type User } from "@prisma/client";

export type ExcludedUser = Omit<User, 'password' | 'created_at' | 'updated_at'>

export const useAuth = () => {
    const useAuthToken = () => useState<string>('auth:token')
    const useAuthUser = () => useState<ExcludedUser>('auth:user')

    const setToken = (value: string) => useAuthToken().value = value
    const setUser = (value: ExcludedUser) => useAuthUser().value = value

    const login = async (body: LoginRequest) => {
        const res = await $fetch<{
            access_token: string,
            user: ExcludedUser
        }>('/api/auth/login', {
            method: 'POST',
            body
        });

        setToken(res.access_token)
        setUser(res.user)
        
        return res
    }

    return {
        login,
        setToken,
        setUser,
        useAuthToken,
        useAuthUser
    }
}
