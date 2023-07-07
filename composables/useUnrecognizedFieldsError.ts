export const useUnrecognizedFieldsError = (errors: Ref<[string, string][] | undefined>, data: object) => {
    const keys = Object.keys({...data})
    
    const unrecognizedFieldsError = computed(() => {
        const result: string[] = []
    
        errors.value?.forEach(([key, value]) => {
            if(!keys.includes(key))
                result.push(value)
        })
    
        return result
    })

    return {
        unrecognizedFieldsError
    }
}