<script lang="ts" setup>
defineProps({
    makeInteractive: {
        type: Boolean,
        default: true,
    },
});
</script>

<template>
    <div
        class="default-border-color default-transition border-b p-3"
        :class="[
            makeInteractive
                ? 'cursor-pointer hover:bg-gray-200 dark:hover:bg-dim-300'
                : '',
        ]"
    >
        <slot></slot>
    </div>
</template>
