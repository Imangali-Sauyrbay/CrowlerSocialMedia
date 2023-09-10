export const useIsMounted = () => {
    const mounted = ref(false)

    onMounted(() => {
        mounted.value = true
    })

    return mounted
}