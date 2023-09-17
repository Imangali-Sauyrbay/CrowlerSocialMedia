<script lang="ts" setup>
const sizes = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-2 text-sm",
    lg: "px-4 py-2 text-md",
};

const prop = defineProps<{
    isLoading?: boolean;
    size?: keyof typeof sizes;
    customSize?: boolean;
    liquid?: boolean;
}>();

defineEmits<{
    (event: "click", e: MouseEvent): void;
}>();

const sizeClass = computed(() => {
    if (prop.customSize && !prop.size) return "";
    if (!prop.size) return sizes.md;
    return sizes[prop.size];
});

const buttonRef = ref<HTMLButtonElement>();

const bounds = reactive({
    w: 0,
    h: 0,
});

const getButtonSize = () => {
    const boundingRect = buttonRef.value?.getBoundingClientRect();

    if (!boundingRect) return;

    bounds.w = boundingRect.width;
    bounds.h = boundingRect.height;
};

const unwatch = watch(sizeClass, getButtonSize);
onMounted(getButtonSize);
onBeforeUnmount(unwatch);
</script>

<template>
    <button
        ref="buttonRef"
        class="inline-flex items-center justify-center rounded-full bg-blue-400 text-white hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-blue-300"
        :class="[sizeClass, liquid ? 'w-full' : 'w-min']"
        :style="{
            width: isLoading ? bounds.w + 'px' : '',
            height: isLoading ? bounds.h + 'px' : '',
        }"
        @click="$emit('click', $event)"
    >
        <IconSpinner v-if="isLoading" class="h-5 w-5 text-white" />
        <slot v-else></slot>
    </button>
</template>
