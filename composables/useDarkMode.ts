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

    const setBodyClass = () => {
        if (process.client)
            document.body.classList[state.value ? "add" : "remove"]("dark");

        if (process.server) {
            useHead({
                bodyAttrs: {
                    class: state.value ? "dark" : "",
                },
            });
        }
    };

    if (process.client) {
        watch(
            () => state.value,
            (newState): void => {
                setSate(newState);
                setBodyClass();
            },
        );

        state.value = getState();
    }

    if (process.server) {
        const darkMode = useCookie<boolean>(COOKIE_NAME);
        state.value = darkMode.value;
    }

    setBodyClass();
    return state;
};
