<script lang="ts" setup>
defineProps<{ title: string }>();
</script>

<template>
    <div class="default-border-color container">
        <h1
            class="default-border-color default-transition border-b p-3 text-base font-extrabold text-gray-900 dark:text-gray-100"
        >
            {{ title }}
        </h1>

        <slot></slot>

        <div
            class="default-transition cursor-pointer select-none p-3 text-xs text-blue-900 hover:bg-gray-200 dark:text-blue-400 dark:hover:bg-dim-200"
        >
            {{ $t("sidebar.right.show-more") }}
        </div>
    </div>
</template>

<style scoped>
.container {
    @apply m-2 overflow-hidden rounded-2xl border bg-gray-100 dark:bg-dim-700 dark:text-white;
    max-width: 95%;
}
</style>
