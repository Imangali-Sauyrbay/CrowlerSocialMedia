<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { ExcludedCrowl } from "~/server/database/transformers/crowl";

const {
    useCrowlModalState,
    handleClose,
    useCrowlModalReply,
    handleOpen,
    onOpen,
} = useCrowlModal();

const isOpen = useCrowlModalState();
const bus = useCrowlModalEvents();
const replyTo = useCrowlModalReply();

const { t } = useI18n();

const placeholder = ref<string | undefined>();

const unsub = onOpen(() => {
    placeholder.value = replyTo.value
        ? t("crowls.reply_placeholder")
        : undefined;
});

bus.on((event, payload) => {
    if (event === "close") {
        handleClose();
    }

    if (event === "open") {
        handleOpen(payload?.replyTo);
    }
});

const onSuccess = (data: ExcludedCrowl) => {
    handleClose();
    handleFormSuccess(data);
};

onBeforeUnmount(unsub);
</script>

<template>
    <UIModal :is-open="isOpen" @close="handleClose">
        <CrowlItem
            v-if="replyTo"
            class="default-border-color border-b pb-4"
            :crowl="replyTo"
            compact-image
            compact
            hide-actions
        />

        <CrowlForm
            :reply-to="replyTo?.id"
            :placeholder="placeholder"
            compact
            @success="onSuccess"
        />
    </UIModal>
</template>
