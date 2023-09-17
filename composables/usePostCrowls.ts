import { useMutation } from "@tanstack/vue-query";
import { ExcludedCrowl } from "~/server/database/transformers/crowl";
import { CrowlDataRequestScheme } from "~/validation/crowlSchemas";

type CrowlType = {
    text: string;
    media: File[];
    replyTo?: number;
};

export type CrowlResponce = ExcludedCrowl;

export const postCrowl = (crowl: CrowlType) => {
    const form = new FormData();
    form.append("text", crowl.text);

    if (crowl.replyTo) {
        form.append("reply_to", crowl.replyTo.toString());
    }

    crowl.media.forEach((file) => {
        form.append("media", file);
    });

    return useFetchApi<CrowlResponce>("/api/crowls", {
        body: form,
        method: "POST",
    });
};

type PostCrowlsOptions = {
    onSuccess?: (data: CrowlResponce) => void;
};

export const usePostCrowls = (options: PostCrowlsOptions = {}) => {
    const { handleFetchError, combineWithValidator } = useValidatorWrapper();

    const mutation = useMutation<CrowlResponce, unknown, CrowlType>({
        mutationFn: postCrowl,
        onError: handleFetchError,
        onSuccess: (data: CrowlResponce) => {
            if (options.onSuccess) options.onSuccess(data);
        },
    });

    return combineWithValidator(mutation, CrowlDataRequestScheme);
};
