<script lang="ts" setup>
const data = reactive({
    username: "",
    password: "",
});

const {
    validator: { validated, validationErrors, unrecognizedFieldsErrors },

    mutate,
    isLoading,
} = useLogin();

const onSubmit = () => {
    if (!validated({ ...data })) return;
    mutate({ ...data });
};

// For disabling submit button until it mounts
const isMounted = useIsMounted();
</script>

<template>
    <div class="w-full">
        <form class="w-full space-y-6 pt-5">
            <UIInput
                v-model="data.username"
                :placeholder="$t('form.username.placeholder')"
                :label="$t('form.username.label')"
                :errors="validationErrors"
                field="username"
            />

            <UIInput
                v-model="data.password"
                :placeholder="$t('form.password.placeholder')"
                :label="$t('form.password.label')"
                :errors="validationErrors"
                field="password"
                type="password"
            />

            <UIErrorList :errors="unrecognizedFieldsErrors" />

            <div class="flex w-full flex-col items-end">
                <UIButton
                    type="submit"
                    :disabled="isLoading || isMounted"
                    :is-loading="isLoading"
                    liquid
                    @click.prevent="onSubmit"
                    >{{ $t("form.login") }}</UIButton
                >
                <span
                    class="mr-5 mt-3 font-semibold text-gray-600 dark:text-gray-400"
                    ><nuxt-link to="/auth/register">{{
                        $t("form.register")
                    }}</nuxt-link></span
                >
            </div>
        </form>
    </div>
</template>
