const promises: Promise<any>[] = [];
const isFirstLoading = ref(true);
const MIN_TIME_TO_SHOW = 700;

let id = ref(0);
let startTime = ref(Date.now());
let timeout: number;

const setPromiseAll = () => {
    // It will invalidate all the past calls and sets new promise
    const currentID = id.value++;

    startTime.value = Date.now();
    clearTimeout(timeout);

    Promise.allSettled(promises).then(() => {
        if (currentID !== id.value - 1) return
        
        const now = Date.now();

        if (now - startTime.value > MIN_TIME_TO_SHOW)
            return isFirstLoading.value = false;

        timeout = window.setTimeout(
            () => (isFirstLoading.value = false),
            MIN_TIME_TO_SHOW - (now - startTime.value)
        );        
    });
};

export const useFirstLoaderBus = () => {
    const registerAsyncFirstLoad = (promise: Promise<any>) => {
        if (!isFirstLoading.value) return false;

        promises.push(promise);

        if (process.client) setPromiseAll();
        return true;
    };

    if (promises.length === 0 && isFirstLoading.value && process.client)
        setPromiseAll();

    return { isFirstLoading, registerAsyncFirstLoad };
};
