<script lang="ts" setup>
defineProps<{ active?: boolean; textContent?: string }>();

const tabRef = ref<HTMLElement>();
const tooltipRef = ref<HTMLElement>();
const tooltipTop = ref("inherit");
const tooltipLeft = ref("10%");

const tooltipOffset = 1.2;
const defaultTooltipHeight = 32;

const setTooltipPosition = () => {
    const tabBounds = tabRef.value?.getBoundingClientRect();
    if (!tabBounds || (tabBounds.y === 0 && tabBounds.x === 0)) return;

    const tooltipBounds = tooltipRef.value?.getBoundingClientRect();
    const tooltipHeight = tooltipBounds?.height || defaultTooltipHeight;

    const fromTop = tabBounds.top || tabBounds.y;
    const fromLeft = tabBounds.left || tabBounds.x;

    const offsetHeight = (tabBounds.height - tooltipHeight) / 2;

    tooltipTop.value = `${fromTop + offsetHeight}px`;
    tooltipLeft.value = `${fromLeft + tabBounds.width * tooltipOffset}px`;
};
</script>

<template>
    <div
        ref="tabRef"
        class="tab default-transition"
        @pointerenter="setTooltipPosition"
    >
        <NuxtLink>
            <div class="tab-icon">
                <slot name="icon" :is-active="active"></slot>
            </div>

            <div
                class="tab-text"
                :class="[active ? 'font-semibold' : 'font-normal']"
            >
                {{ textContent }}
            </div>

            <div
                ref="tooltipRef"
                class="tab-tooltip"
                :style="{ top: tooltipTop, left: tooltipLeft }"
            >
                {{ textContent }}
            </div>
        </NuxtLink>
    </div>
</template>

<style scoped>
.tab {
    @apply relative flex w-fit cursor-pointer items-center rounded-full p-2 text-black hover:bg-gray-200 dark:text-white dark:hover:bg-dim-200;
}

.tab-icon {
    @apply h-6 w-6;
}

.tab-tooltip {
    @apply fixed z-50 hidden w-max rounded-full bg-white px-2 py-1 shadow-md shadow-slate-500 dark:bg-dim-800;
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
