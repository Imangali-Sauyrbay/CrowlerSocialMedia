<script setup lang="ts">
import { ExcludedCrowl } from "~/server/database/transformers/crowl";

const props = defineProps<{
    placeholder?: string;
    replyTo?: number;
    compact?: boolean;
}>();

const emits = defineEmits<{
    (event: "success", data: ExcludedCrowl): void;
}>();

const user = useAuthUser();
const { withDefaultLogo } = useDefaultLogo();

const {
    validator: { validated, validationErrors },
    mutate,
    isSuccess,
    isLoading,
} = usePostCrowls({
    onSuccess(data) {
        emits("success", data);
    },
});

const handleSubmit = (text: string, files: File[]) => {
    if (!validated({ text, media: mapFilesToObjectsForValidation(files) }))
        return;
    const body = { text, media: files, replyTo: props.replyTo };
    mutate(body);
};
</script>

<template>
    <CrowlFormInput
        :profile="withDefaultLogo(user?.profile)"
        :errors="validationErrors || []"
        :is-success="isSuccess"
        :is-loading="isLoading"
        :placeholder="placeholder"
        :compact="compact"
        class="default-border-color border-b"
        @on-submit="handleSubmit"
    />
</template>
