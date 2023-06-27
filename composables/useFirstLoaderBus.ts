const promises: Promise<any>[] = [] 
const isFirstLoading = ref(true)
const MIN_TIME_TO_SHOW = 1000

let id = 0
let timestamp = Date.now()
const setPromiseAll = () => {
    const currentID = id++

    timestamp =  Date.now()

    Promise.all(promises).then(() => {
        if(currentID === id - 1) {
            const now = Date.now()
            if(now - timestamp < MIN_TIME_TO_SHOW)
                setTimeout(() => isFirstLoading.value = false, MIN_TIME_TO_SHOW - (now - timestamp))
            else
                isFirstLoading.value = false
        }
    })
}

export const useFirstLoaderBus = () => {
    const registerAsyncFirstLoad = (promise: Promise<any>) => {
        if(!isFirstLoading.value) return false

        promises.push(promise)
        setPromiseAll()
        return true
    }
    
    if(promises.length === 0 && isFirstLoading.value) setPromiseAll()

    return {isFirstLoading, registerAsyncFirstLoad}
}