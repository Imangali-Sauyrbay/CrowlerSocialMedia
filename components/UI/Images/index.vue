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
</script>

<template>
    <template v-if="!!images.length">
        <div class="w-full grid grid-cols-1 grid-flow-row gap-4 p-4" :class="{
            'grid-cols-2': images.length > 1
        }">
            <TransitionGroup name="image">
                <UIImagesItem
                    v-for="([name, url], i) in images"
                    :key="name + url"
                    :name="name"
                    :url="url"
                    :closable="closable"
                    :should-span="shouldSpanColumn(i)"
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