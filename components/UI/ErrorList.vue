<script lang="ts" setup>
defineProps<{
    errors?: string[];
}>();
</script>

<template>
    <ul
        v-if="errors && errors.length > 0"
        class="ml-4 mt-2 text-sm text-red-500"
    >
        <template v-for="error in errors" :key="error">
            <li class="list-disc">{{ error }}</li>
        </template>
    </ul>
</template>
