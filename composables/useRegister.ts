import { useMutation } from "@tanstack/vue-query";
import { useNotification } from "@kyvg/vue3-notification";
import { useI18n } from "vue-i18n";
import { RegisterResponce } from "~/composables/useAuth";
import { RegisterRequest, RegistrationSchema } from "~/validation/authSchemas";

export const useRegister = () => {
    const { register } = useAuth();
    const { handleFetchError, combineWithValidator } = useValidatorWrapper();
    const { notify } = useNotification();
    const { t } = useI18n();
    const router = useRouter();

    const mutation = useMutation<RegisterResponce, unknown, RegisterRequest>({
        mutationFn: (data) => register(data),
        onError: handleFetchError,
        onSuccess(data) {
            if (data.success) {
                notify({
                    duration: 5000,
                    type: "success",
                    title: t("notifications.success"),
                    text: t("notifications.messages.registered", {
                        username: data.user.username,
                    }),
                });

                router.push("/auth/login");
            }
        },
    });

    return combineWithValidator(mutation, RegistrationSchema);
};
