<script lang="ts" setup>
defineProps<{title: string, loading: boolean}>()

/* To Center Spinner */
const header = ref<HTMLDivElement>()
const headerHeight = ref('0px')

onMounted(() => {
    const bounds =  header.value?.getBoundingClientRect()

    if(bounds)
        headerHeight.value = bounds.height + 'px'
})
</script>

<template>
    <div class="h-full border-x default-border-color overflow-hidden">
        <div class="sticky top-0 px-4 py-3 bg-white/70 backdrop-blur-sm dark:bg-dim-900/70" ref="header">
            <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100">{{ title }}</h2>
        </div>
        <div v-if="loading" class="offset-height flex justify-center items-center">
            <UISpinner />
        </div>
        <div v-else>
            <slot></slot>
        </div>
    </div>
</template>

<style>
    .offset-height {
        height: calc(100% - v-bind(headerHeight))
    }
</style>