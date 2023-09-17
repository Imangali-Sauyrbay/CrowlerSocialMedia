<script setup lang="ts">
import { ExcludedCrowl } from '~/server/database/transformers/crowl';

const props = defineProps<{
    placeholder?: string,
    replyTo?: number
}>()

const emits = defineEmits<{
    (event: 'success', data: ExcludedCrowl): void
}>()

const user = useAuthUser()
const { withDefaultLogo } = useDefaultLogo()

const {
    validator: { validated, validationErrors },
    mutate,
    isSuccess,
    isLoading,
} = usePostCrowls({
    onSuccess(data) {
        emits('success', data)
    },
})

const handleSubmit = (text: string, files: File[]) => {
    if(! validated({ text, media: mapFilesToObjectsForValidation(files) })) return
    const body = { text, media: files, replyTo: props.replyTo }
    mutate(body)
}
</script>

<template>
    <CrowlFormInput
        :profile="withDefaultLogo(user?.profile)"
        @onSubmit="handleSubmit"
        :errors="validationErrors || []"
        :isSuccess="isSuccess"
        :isLoading="isLoading"
        :placeholder="placeholder"
        class="default-border-color border-b"
    />
</template>