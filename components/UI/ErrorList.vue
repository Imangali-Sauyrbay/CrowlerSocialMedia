<script lang="ts" setup>
defineProps<{
    errors?: string[],
}>()
</script>

<template>
    <ul class="ml-4 mt-2 text-red-500 text-sm" v-if="errors && errors.length > 0">
        <template v-for="error in errors" :key="error">
            <li class="list-disc">{{ error }}</li>
        </template>
    </ul>
</template>