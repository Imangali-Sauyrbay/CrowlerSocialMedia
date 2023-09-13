import { useMutation } from "@tanstack/vue-query"
import { ExcludedCrowl } from "~/server/database/transformers/crowl"
import { CrowlDataRequestScheme } from "~/validation/crowlSchemas"

type CrowlType = {
    text: string,
    media: File[]
}

type CrowlResponce = {
    crowl: ExcludedCrowl
}

export const postCrowl = (crowl: CrowlType) => {
    const form = new FormData()
    form.append('text', crowl.text)

    crowl.media.forEach(file => {
        form.append('media', file)
    })

    return useFetchApi('/api/crowls', {
        body: form,
        method: 'POST',
    })
}

export const usePostCrowls = () => {
    const { handleFetchError, combineWithValidator } = useValidatorWrapper()

    const mutation = useMutation<CrowlResponce, unknown, CrowlType>({
        mutationFn: postCrowl,
        onError: handleFetchError,
    })

    return combineWithValidator(mutation, CrowlDataRequestScheme)
}

export default () => ({
    usePostCrowls
})