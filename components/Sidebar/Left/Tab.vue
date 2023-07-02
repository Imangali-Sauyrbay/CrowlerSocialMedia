<script lang="ts" setup>
defineProps<{ active?: boolean; textContent?: string }>();
</script>

<template>
    <NuxtLink class="tab default-transition">
        <div class="tab-icon">
            <slot name="icon" :is-active="active"></slot>
        </div>
        <div
            class="tab-text"
            :class="[active ? 'font-semibold' : 'font-normal']"
        >
            {{ textContent }}
        </div>

        <div class="tab-tooltip">
            {{ textContent }}
        </div>
    </NuxtLink>
</template>

<style scoped>
.tab {
    @apply relative flex w-fit cursor-pointer items-center rounded-full p-2 text-black hover:bg-gray-200 dark:text-white dark:hover:bg-dim-200;
}

.tab-icon {
    @apply h-6 w-6;
}

.tab-tooltip {
    @apply fixed hidden w-max rounded-full bg-white px-2 py-1 shadow-md shadow-slate-500 dark:bg-dim-800;
    left: 9%;
}

.tab-text {
    @apply ml-4 hidden text-lg xl:block;
}

.tab:hover .tab-tooltip {
    display: block;
}

@screen xl {
    .tab:hover .tab-tooltip {
        display: none;
    }
}
</style>
