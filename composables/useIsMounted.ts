export const useIsMounted = (isClient: boolean = true) => {
    const mounted = ref(false);

    onMounted(() => {
        if (isClient && !process.client) return;
        mounted.value = true;
    });

    return mounted;
};
