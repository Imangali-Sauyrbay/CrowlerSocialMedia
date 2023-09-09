<script lang="ts" setup>
import type { ErrorAPIData } from 'utils/APIErrors';
import { LoginSchema } from '~/validation/authSchemas'

const data = reactive({
    username: '',
    password: ''
});

const loading = ref(false)

const {errors, validated, setErrors} = useValidator()
const { login } = useAuth()

import type { FetchError } from 'ofetch'

const onSubmit = async () => {
    const body = await validated(LoginSchema, data)

    if(! body) return

    try {
        loading.value = true
        await login(body)
    } catch (e) {
        if(isValidationError(e))
            setErrors(((e as FetchError).data as ErrorAPIData).data)
    } finally {
        loading.value = false
    }
}

const { unrecognizedFieldsError } = useUnrecognizedFieldsError(errors, data)

watch([() => data.username, () => data.password], () => {
    validated(LoginSchema, data)
})

const mounted = ref(false)

onMounted(() => {
    mounted.value = true
})
</script>

<template>
    <div class="w-full">
        <form class="pt-5 space-y-6 w-full">
            <UIInput
                :placeholder="$t('form.username.placeholder')"
                :label="$t('form.username.label')"
                :errors="errors"
                field="username"
                v-model="data.username"
            />

            <UIInput
                :placeholder="$t('form.password.placeholder')"
                :label="$t('form.password.label')"
                :errors="errors"
                field="password"
                type="password"
                v-model="data.password"
            />

            <UIErrorList :errors="unrecognizedFieldsError"/>

            <div>
                <button type="submit" @click.prevent="onSubmit" :disabled="!mounted">{{ $t('form.login') }}</button>
            </div>
        </form>
    </div>
</template>