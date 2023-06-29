<script lang="ts" setup>
defineProps<{ active?: boolean, textContent?: string }>()
</script>

<template>
    <NuxtLink class="tab default-transition">
        <div class="tab-icon">
            <slot name="icon" :isActive="active"></slot>
        </div>
        <div class="tab-text" :class="[active ? 'font-semibold' : 'font-normal']">
            {{ textContent }}
        </div>

        <div class="tab-tooltip">
            {{ textContent }}
        </div>
    </NuxtLink>
</template>

<style scoped>
.tab {
    @apply relative flex items-center p-2 cursor-pointer w-fit rounded-full text-black hover:bg-gray-200 dark:hover:bg-dim-200 dark:text-white;
}

.tab-icon {
    @apply w-6 h-6;
}

.tab-tooltip {
    @apply w-max fixed hidden bg-white dark:bg-dim-800 rounded-full px-2 py-1 shadow-slate-500 shadow-md;
    left: 9%;
}

.tab-text {
    @apply ml-4 text-lg hidden xl:block;
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
