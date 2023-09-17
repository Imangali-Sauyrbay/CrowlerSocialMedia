<script setup lang="ts">
defineProps<{
    url: string;
    name: string;
    shouldSpan: boolean;
    closable: boolean;
}>();

defineEmits<{
    (event: "close", name: MouseEvent): void;
}>();
</script>

<template>
    <div
        class="bg-transparency default-border-color relative h-full w-full overflow-hidden border-2"
        :class="{
            'col-span-2': shouldSpan,
        }"
    >
        <img :src="url" :alt="name" class="h-full w-full object-cover" />

        <UIImagesCloseButton v-if="closable" @click="$emit('close', $event)" />
    </div>
</template>

<style scoped>
.bg-transparency {
    background-image: url("/assets/images/transparency.png");
}
</style>
