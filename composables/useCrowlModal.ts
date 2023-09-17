import { ExcludedCrowl } from "~/server/database/transformers/crowl";

type CallBack = (state: boolean) => void;

const openCallbacks = ref<CallBack[]>([]);
const closeCallbacks = ref<CallBack[]>([]);

export const useCrowlModal = () => {
    const useCrowlModalState = () => useState("crowl_modal_state", () => false);
    const useCrowlModalReply = () =>
        useState<ExcludedCrowl | undefined>("crowl_modal_reply");

    const clearReply = () => {
        useCrowlModalReply().value = undefined;
    };

    const handleClose = () => {
        const state = useCrowlModalState();
        state.value = false;
        closeCallbacks.value.forEach((cb) => cb(state.value));
    };

    const handleOpen = (crowl?: ExcludedCrowl) => {
        clearReply();

        if (crowl) {
            useCrowlModalReply().value = crowl;
        }

        const state = useCrowlModalState();
        state.value = true;
        openCallbacks.value.forEach((cb) => cb(state.value));
    };

    const handleSubscribe = (callbacks: Ref<CallBack[]>) => (fn: CallBack) => {
        callbacks.value.push(fn);
        return () => {
            callbacks.value = callbacks.value.filter((cb) => cb !== fn);
        };
    };

    return {
        useCrowlModalState,
        handleClose,
        handleOpen,
        useCrowlModalReply,
        clearReply,
        onClose: handleSubscribe(closeCallbacks),
        onOpen: handleSubscribe(openCallbacks),
    };
};
