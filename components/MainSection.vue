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
        class="default-border-color relative h-full max-h-full overflow-hidden border-x"
    >
        <div
            ref="header"
            class="absolute left-0 right-0 top-0 z-50 select-none bg-white/30 px-4 py-3 backdrop-blur-sm dark:bg-dim-900/30"
        >
            <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100">
                {{ title }}
            </h2>
        </div>
        <div
            v-show="loading"
            class="offset-height flex items-center justify-center"
        >
            <IconSpinner />
        </div>
        <div v-show="!loading" class="h-full w-full">
            <slot></slot>
        </div>
    </div>
</template>

<style>
.offset-height {
    height: calc(100% - v-bind(headerHeight));
}

.offset-padding {
    padding-top: v-bind(headerHeight);
}
.offset-margin {
    margin-top: v-bind(headerHeight);
}
</style>
