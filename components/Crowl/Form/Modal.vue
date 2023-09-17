<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { ExcludedCrowl } from '~/server/database/transformers/crowl';

const {
    useCrowlModalState,
    handleClose,
    useCrowlModalReply,
    handleOpen,
    onOpen
} = useCrowlModal()

const isOpen = useCrowlModalState()
const bus = useCrowlModalEvents()
const replyTo = useCrowlModalReply()

const { t } = useI18n()

const placeholder = ref<string | undefined>()

const unsub = onOpen(() => {
    placeholder.value = replyTo.value ? t('crowls.reply_placeholder') : undefined
})

bus.on((event, payload) => {
    switch(event) {
        case 'close':
            handleClose()
            break;

        case 'open':
            handleOpen(payload?.replyTo)
    }
})

const onSuccess = (data: ExcludedCrowl) => {
    handleClose();
    handleFormSuccess(data);
}

onBeforeUnmount(unsub)
</script>

<template>
    <UIModal
        :isOpen="isOpen"
        @close="handleClose"
    >
        <CrowlItem
            v-if="replyTo"
            class="default-border-color border-b pb-4"
            :crowl="replyTo"
            compactImage
            compact
            hideActions
        />

        <CrowlForm
            @success="onSuccess"
            :replyTo="replyTo?.id"
            :placeholder="placeholder"
            compact
        />
    </UIModal>
</template>