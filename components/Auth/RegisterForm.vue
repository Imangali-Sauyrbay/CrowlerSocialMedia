<script lang="ts" setup>
import { RegisterRequest } from '~/validation/authSchemas'

const data = reactive<RegisterRequest>({
    username: '',
    email: '',
    password: '',
    password_confirm: '',
    name: '',
});

const {
    validator: {
        validated,
        validationErrors,
        unrecognizedFieldsErrors
    },

    mutate
} = useRegister()

const onSubmit = async () => {
    if(! validated({...data})) return
    if(! data.name) data.name = data.username
    mutate({...data})
}

// For disabling submit button until it mounts
const isMounted = useIsMounted()
</script>

<template>
    <div class="w-full h-full">
        <form class="h-full">
            <div class="space-y-6 pt-5 pr-2 mb-5 w-full max-h-[90%] overflow-x-hidden overflow-y-scroll default-scrollbar">
                <UIInput
                    :placeholder="$t('form.username.placeholder')"
                    :label="$t('form.username.label')"
                    :errors="validationErrors"
                    field="username"
                    v-model="data.username"
                />
    
                <UIInput
                    :placeholder="$t('form.email.placeholder')"
                    :label="$t('form.email.label')"
                    :errors="validationErrors"
                    field="email"
                    type="email"
                    v-model="data.email"
                />
    
                <UIInput
                    :placeholder="$t('form.name.placeholder')"
                    :label="$t('form.name.label')"
                    :errors="validationErrors"
                    :required="false"
                    field="name"
                    v-model="data.name"
                />
    
                <UIInput
                    :placeholder="$t('form.password.placeholder')"
                    :label="$t('form.password.label')"
                    :errors="validationErrors"
                    field="password"
                    type="password"
                    v-model="data.password"
                />
    
                <UIInput
                    :placeholder="$t('form.password_confirm.placeholder')"
                    :label="$t('form.password_confirm.label')"
                    :errors="validationErrors"
                    field="password_confirm"
                    type="password"
                    v-model="data.password_confirm"
                />
            </div>

            <UIErrorList :errors="unrecognizedFieldsErrors"/>

            <div class="flex justify-between w-full">
                <button type="submit" @click.prevent="onSubmit" :disabled="!isMounted">{{ $t('form.register') }}</button>
                <span><nuxt-link to="/auth/login">{{ $t('form.login') }}</nuxt-link></span>
            </div>
        </form>
    </div>
</template>