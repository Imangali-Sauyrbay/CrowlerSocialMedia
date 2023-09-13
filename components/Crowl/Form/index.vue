<script setup lang="ts">
const user = useAuthUser()
const defaultLogo = useDefaultLogo()
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
        :profile="user?.profile || defaultLogo"
        @onSubmit="handleSubmit"
        :errors="validationErrors || []"
        :isSuccess="isSuccess"
        :isLoading="isLoading"
    />
    <hr>
    {{ data }}
</template>