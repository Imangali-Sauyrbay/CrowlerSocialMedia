<script lang="ts" setup>
defineEmits<{
    (event: "click"): void;
}>();

defineProps<{
    color: "red" | "green" | "blue";
    size?: number;
}>();

const defaultSize = 5;
</script>

<template>
    <div
        class="group flex cursor-pointer items-center text-gray-400"
        @click.stop.prevent="$emit('click')"
    >
        <div
            :class="`rounded-full p-2 group-hover:bg-${color}-100 group-hover:text-${color}-400 default-transition dark:group-hover:bg-opacity-20`"
        >
            <slot
                name="icon"
                :classes="`w-${size || defaultSize} h-${size || defaultSize}`"
            />
        </div>

        <span :class="`ml-1 group-hover:text-${color}-400`">
            <slot></slot>
        </span>
    </div>
</template>
