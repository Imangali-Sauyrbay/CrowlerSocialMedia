<script setup lang="ts">
import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
} from '@headlessui/vue'

const emits = defineEmits<{
    (event: 'close'): void
}>()

defineProps<{
    isOpen: boolean
}>()

const closeModal = () => {
    emits('close')
}
</script>

<template>
    <TransitionRoot
        as="template"   
        :show="isOpen"
        appear
    >
        <Dialog
            as="div"
            class="relative z-50"
            @close="closeModal"
        >
            <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100"
                leave-to="opacity-0"
            >
                <div class="fixed inset-0 bg-black bg-opacity-50"></div>
            </TransitionChild>

            <div
                class="fixed inset-0 overflow-y-auto"
            >
                <div
                    class="flex items-center justify-center min-h-full p-4 text-center"
                >
                    <TransitionChild
                        as="template"
                        enter="duration-300 ease-out"
                        enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100"
                        leave="duration-200 ease-in"
                        leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95"
                    >
                        <DialogPanel
                            class="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-dim-800 shadow-xl rounded-2xl"
                        >
                            <slot></slot>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>
