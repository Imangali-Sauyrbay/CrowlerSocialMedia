<script lang="ts" setup>
const props = defineProps<{
    length: number,
    maxLength: number
}>()

const exceededMaxLength = computed(() => props.length > props.maxLength)
</script>

<template>
    <span class="ml-2 mr-2 text-sm text-gray-500" :class="{
        'text-red-600': exceededMaxLength
    }">{{ length }}/{{ maxLength }}</span>
</template>