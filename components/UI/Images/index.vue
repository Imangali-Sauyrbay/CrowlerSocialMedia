<script setup lang="ts">
const props = defineProps<{
    images: ([string, string])[],
    closable: boolean
}>()

defineEmits<{
    (event: 'removeImage', name: string): void
}>()

const shouldSpanColumn = (i: number) => {
    if(!(props.images.length & 1)) return false
    if(i === props.images.length - 1) return true

    return false
}

const calculateImageClassesToRoundEdges = (i: number) => {
    const classes: string[] = [];

    if(props.images.length === 1) return ['rounded-2xl']

    if (props.images.length <= 1)
        return classes

    // Rounding top Edges
    if (i === 0) classes.push('rounded-tl-2xl');
    if (i === 1) classes.push('rounded-tr-2xl');


    // Rounding bottom left edges if there 2 or more images
    if (props.images.length < 3 && i === 0) 
        classes.push('rounded-bl-2xl');
    if(props.images.length > 2 && i === 2)
        classes.push('rounded-bl-2xl');

    // Rounding bottom right edge only if it in the corner
    if(props.images.length < 3 && i === 1)
        classes.push('rounded-br-2xl');
    if(props.images.length > 2 && i === 3)
        classes.push('rounded-br-2xl');
    if(props.images.length === 3 && i === 2)
        classes.push('rounded-br-2xl');

    return classes;
}
</script>

<template>
    <template v-if="!!images.length">
        <div
            v-bind="$attrs"
            class="w-full max-h-96 h-96 grid grid-cols-1 grid-rows-1 gap-1 overflow-hidden"
            :class="{
                'grid-cols-2': images.length > 1,
                'grid-rows-2': images.length > 2
            }"
        >
            <TransitionGroup name="image">
                <UIImagesItem
                    v-for="([name, url], i) in images"
                    :key="name + url"
                    :name="name"
                    :url="url"
                    :closable="closable"
                    :should-span="shouldSpanColumn(i)"
                    :class="calculateImageClassesToRoundEdges(i)"
                    @close="$emit('removeImage', name)"
                />
            </TransitionGroup>
        </div>
    </template>
</template>

<style>
.image-move {
  transition: all 0.3s ease;
}

.image-leave-active {
  position: absolute;
  display: none;
}
</style>