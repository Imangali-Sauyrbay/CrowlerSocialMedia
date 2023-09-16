<script lang="ts" setup>
defineEmits<{
    (event: 'click'): void
}>()

defineProps<{
    color: 'red' | 'green' | 'blue',
    size?: number
}>()

const defaultSize = 5
</script>

<template>
    <div
        @click.stop.prevent="$emit('click')"
        class="flex items-center text-gray-400 cursor-pointer group">

        <div
            :class="`p-2 rounded-full group-hover:bg-${color}-100 group-hover:text-${color}-400 dark:group-hover:bg-opacity-20 default-transition`">

            <slot name="icon" :classes="`w-${size || defaultSize} h-${size || defaultSize}`" />

        </div>

        <span :class="`ml-1 group-hover:text-${color}-400`">
            <slot></slot>
        </span>

    </div>
</template>
