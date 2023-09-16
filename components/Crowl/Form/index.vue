<script setup lang="ts">
const user = useAuthUser()
const { withDefaultLogo } = useDefaultLogo()

const {
    validator: { validated, validationErrors },
    mutate,
    isSuccess,
    isLoading,
    data
} = usePostCrowls()

const handleSubmit = (text: string, files: File[]) => {
    if(! validated({ text, media: mapFilesToObjectsForValidation(files) })) return
    const body = { text, media: files }
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
        class="default-border-color border-b"
    />
</template>