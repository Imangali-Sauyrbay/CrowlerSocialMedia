<script setup lang="ts">
const props = defineProps<{
    url: string,
    name: string,
    shouldSpan: boolean,
    closable: boolean
}>()

defineEmits<{
    (event: 'close', name: MouseEvent): void
}>()
</script>

<template>
        <div
            class="w-full h-full rounded-2xl overflow-hidden relative bg-transparency default-border-color border"
            :class="{
                'col-span-2': shouldSpan
            }"
        >
            <img
                :src="url"
                :alt="name"
                class="w-full h-full object-cover"
            >

            <UIImagesCloseButton v-if="closable" @click="$emit('close', $event)"/>
        </div>
</template>

<style scoped>
.bg-transparency {
    background-image: url('/assets/images/transparency.png');
}
</style>