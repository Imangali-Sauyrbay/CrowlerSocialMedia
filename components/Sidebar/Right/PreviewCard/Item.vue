<script lang="ts" setup>
defineProps({
    makeInteractive: {
        type: Boolean,
        default: true
    }
})
</script>

<template>
    <div
        class="p-3 border-b default-border-color default-transition"
        :class="[makeInteractive ? 'hover:bg-gray-200 dark:hover:bg-dim-300 cursor-pointer' : '']">
        <slot></slot>
    </div>
</template>
