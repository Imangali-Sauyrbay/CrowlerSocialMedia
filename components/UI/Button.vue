<script lang="ts" setup>
const sizes = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-2 text-md',
}

const prop = defineProps<{
    isLoading?: boolean
    size?: keyof typeof sizes,
    customSize?: boolean,
    liquid?: boolean
}>()

defineEmits<{
    (event: 'click', e: MouseEvent): void
}>()

const sizeClass = computed(() => {
    if(prop.customSize && !prop.size) return ''
    if(!prop.size) return sizes['md']
    return sizes[prop.size]
})
</script>

<template>
    <button
        @click="$emit('click', $event)"
        class="text-white bg-blue-400 rounded-full hover:bg-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed"
        :class="[sizeClass, liquid ? 'w-full' : 'w-min']"
    >
        <IconSpinner class="w-5 h-5" v-if="isLoading"/>
        <slot v-else></slot>
    </button>
</template>