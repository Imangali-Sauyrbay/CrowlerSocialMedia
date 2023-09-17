<script setup lang="ts">
defineEmits<{
    (event: "click", e: MouseEvent): void;
}>();
</script>

<template>
    <button
        class="default-transition absolute right-2 top-1 rounded-full bg-gray-800/60 p-2 active:scale-90"
        @click="$emit('click', $event)"
    >
        <IconClose class="h-5 w-5 text-white" />
    </button>
</template>
