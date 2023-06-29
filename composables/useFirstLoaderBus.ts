const promises: Promise<any>[] = [] 
const isFirstLoading = ref(true)
const MIN_TIME_TO_SHOW = 1000

let id = 0
let timestamp = Date.now()
let timeout: number

const setPromiseAll = () => {
    //It will invalidate all the past calls and sets new promise
    const currentID = id++

    timestamp =  Date.now()
    clearTimeout(timeout)

    Promise.all(promises).then(() => {
        if(currentID === id - 1) {
            const now = Date.now()
            if(now - timestamp < MIN_TIME_TO_SHOW)
                timeout = window.setTimeout(() => isFirstLoading.value = false, MIN_TIME_TO_SHOW - (now - timestamp))
            else
                isFirstLoading.value = false
        }
    })
}

export const useFirstLoaderBus = () => {
    const registerAsyncFirstLoad = (promise: Promise<any>) => {
        if(!isFirstLoading.value) return false

        promises.push(promise)

        if(process.client) setPromiseAll()
        return true
    }
    
    if(promises.length === 0 && isFirstLoading.value && process.client) setPromiseAll()

    return {isFirstLoading, registerAsyncFirstLoad}
}
