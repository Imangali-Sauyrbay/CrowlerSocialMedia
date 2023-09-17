<script lang="ts" setup>
import { RegisterRequest } from "~/validation/authSchemas";

const data = reactive<RegisterRequest>({
    username: "",
    email: "",
    password: "",
    password_confirm: "",
    name: "",
});

const {
    validator: { validated, validationErrors, unrecognizedFieldsErrors },

    mutate,
    isLoading,
} = useRegister();

const onSubmit = () => {
    if (!validated({ ...data })) return;
    if (!data.name) data.name = data.username;
    mutate({ ...data });
};

// For disabling submit button until it mounts
const isMounted = useIsMounted();
</script>

<template>
    <div class="h-full w-full">
        <form class="h-full">
            <div
                class="default-scrollbar mb-5 max-h-[90%] w-full space-y-6 overflow-x-hidden overflow-y-scroll pt-5"
            >
                <UIInput
                    v-model="data.username"
                    :placeholder="$t('form.username.placeholder')"
                    :label="$t('form.username.label')"
                    :errors="validationErrors"
                    field="username"
                />

                <UIInput
                    v-model="data.email"
                    :placeholder="$t('form.email.placeholder')"
                    :label="$t('form.email.label')"
                    :errors="validationErrors"
                    field="email"
                    type="email"
                />

                <UIInput
                    v-model="data.name"
                    :placeholder="$t('form.name.placeholder')"
                    :label="$t('form.name.label')"
                    :errors="validationErrors"
                    :required="false"
                    field="name"
                />

                <UIInput
                    v-model="data.password"
                    :placeholder="$t('form.password.placeholder')"
                    :label="$t('form.password.label')"
                    :errors="validationErrors"
                    field="password"
                    type="password"
                />

                <UIInput
                    v-model="data.password_confirm"
                    :placeholder="$t('form.password_confirm.placeholder')"
                    :label="$t('form.password_confirm.label')"
                    :errors="validationErrors"
                    field="password_confirm"
                    type="password"
                />
            </div>

            <UIErrorList :errors="unrecognizedFieldsErrors" />

            <div class="flex w-full flex-col items-end pr-2">
                <UIButton
                    type="submit"
                    :disabled="isLoading || isMounted"
                    :is-loading="isLoading"
                    liquid
                    @click.prevent="onSubmit"
                    >{{ $t("form.register") }}</UIButton
                >
                <span
                    class="mr-5 mt-3 font-semibold text-gray-600 dark:text-gray-400"
                    ><nuxt-link to="/auth/login">{{
                        $t("form.login")
                    }}</nuxt-link></span
                >
            </div>
        </form>
    </div>
</template>
