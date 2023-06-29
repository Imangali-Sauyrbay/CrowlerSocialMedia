<script lang="ts" setup>
defineProps<{ title: string }>()
</script>

<template>
    <div class="container default-border-color">
        <h1 class="p-3 text-base font-extrabold text-gray-900 dark:text-gray-100 border-b default-border-color default-transition">
            {{ title }}
        </h1>

        <slot></slot>

        <div class="p-3 text-xs text-blue-900 dark:text-blue-400  default-transition cursor-pointer select-none hover:bg-gray-200 dark:hover:bg-dim-200">
            {{ $t('sidebar.right.show-more') }}
        </div>
    </div>
</template>

<style scoped>
    .container {
        @apply m-2 border overflow-hidden bg-gray-100 dark:bg-dim-700 dark:text-white rounded-2xl;
        max-width: 95%;
    }
</style>
