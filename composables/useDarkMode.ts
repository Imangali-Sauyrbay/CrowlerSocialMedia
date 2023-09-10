const STORAGE_KEY = "dark";
const COOKIE_NAME = "dark-mode";

const setSate = (state: boolean) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));

    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 1);
    document.cookie = `${COOKIE_NAME}=${state}; expires=${expirationDate.toUTCString()}`;
};

const getState = (): boolean => {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "false");
};

if (process.client) setSate(getState());

export const useDarkMode = () => {
    const state = useState("darkMode", () => true);

    if (process.client) {
        watch(state, (newState) => {
            setSate(newState);
        });

        if (getState()) {
            state.value = true;
        }
    }

    if (process.server) {
        const darkMode = useCookie(COOKIE_NAME);
        state.value = !!JSON.parse(darkMode.value || "true");
    }

    return state;
};
