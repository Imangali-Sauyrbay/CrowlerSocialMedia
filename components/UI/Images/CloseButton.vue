<script setup lang="ts">
defineEmits<{
    (event: 'click', e: MouseEvent): void
}>()
</script>

<template>
    <button
        @click="$emit('click', $event)"
        class="default-transition absolute top-1 right-2 bg-gray-800/60 p-2 rounded-full active:scale-90">
        <IconClose class="w-5 h-5 text-white"/>
    </button>
</template>