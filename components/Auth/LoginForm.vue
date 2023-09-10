<script lang="ts" setup>
const data = reactive({
    username: '',
    password: ''
});

const {
    validator: {
        validated,
        validationErrors,
        unrecognizedFieldsErrors
    },

    mutate,
    isLoading
} = useLogin()


const onSubmit = async () => {
    if(! validated({...data})) return
    mutate({...data})
}

// For disabling submit button until it mounts
const isMounted = useIsMounted()
</script>

<template>
    <div class="w-full">
        <form class="pt-5 space-y-6 w-full">
            <UIInput
                :placeholder="$t('form.username.placeholder')"
                :label="$t('form.username.label')"
                :errors="validationErrors"
                field="username"
                v-model="data.username"
            />

            <UIInput
                :placeholder="$t('form.password.placeholder')"
                :label="$t('form.password.label')"
                :errors="validationErrors"
                field="password"
                type="password"
                v-model="data.password"
            />

            <UIErrorList :errors="unrecognizedFieldsErrors"/>

            <div class="flex justify-between w-full">
                <button type="submit" @click.prevent="onSubmit" :disabled="!isMounted">{{ $t('form.login') }}</button>
                <span><nuxt-link to="/auth/register">{{ $t('form.register') }}</nuxt-link></span>
            </div>
        </form>
    </div>
</template>