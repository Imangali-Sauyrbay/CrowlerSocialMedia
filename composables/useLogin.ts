import { useMutation } from '@tanstack/vue-query'
import { AuthResponce } from '~/composables/useAuth'
import { LoginSchema, LoginRequest } from '~/validation/authSchemas'

export const useLogin = () => {
    const { login } = useAuth()
    const { handleFetchError, combineWithValidator } = useValidatorWrapper()
    const router = useRouter()

    const mutation = useMutation<AuthResponce, unknown, LoginRequest>({
        mutationFn: (data) => login(data),
        onError: handleFetchError,
        onSuccess: () => {
            router.push('/')
        }
    })

    return combineWithValidator(mutation, LoginSchema)
}