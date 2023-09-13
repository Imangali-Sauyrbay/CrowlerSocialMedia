<script lang="ts" setup>
defineProps<{ title: string; loading: boolean }>();

/* To Center Spinner */
const header = ref<HTMLDivElement>();
const headerHeight = ref("0px");

onMounted(() => {
    const bounds = header.value?.getBoundingClientRect();

    if (bounds) headerHeight.value = bounds.height.toString().concat("px");
});
</script>

<template>
    <div
        class="default-border-color h-full overflow-y-auto overflow-x-hidden border-x default-scrollbar"
    >
        <div
            ref="header"
            class="sticky top-0 bg-white/30 px-4 py-3 backdrop-blur-sm dark:bg-dim-900/30 z-50"
        >
            <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100">
                {{ title }}
            </h2>
        </div>
        <div
            v-if="loading"
            class="offset-height flex items-center justify-center"
        >
            <IconSpinner />
        </div>
        <slot v-else></slot>
    </div>
</template>

<style>
.offset-height {
    height: calc(100% - v-bind(headerHeight));
}
</style>
