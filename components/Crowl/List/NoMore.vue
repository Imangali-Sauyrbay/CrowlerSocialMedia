<script lang="ts" setup>
type Types = 'posts' | 'replies'

const props = defineProps<{
    type?: Types
}>()

const mapPaths: Record<Types, string> = {
    'posts': 'crowls.no_posts',
    'replies': 'crowls.no_replies'
}

const path = computed(() => {
    const type = props.type || 'posts'
    return mapPaths[type] ? mapPaths[type] : mapPaths['posts']
})
</script>

<template>
    <div
        class="h-16 flex justify-center items-center"
    >
        <span class="font-medium text-sm text-gray-600 dark:text-gray-400">{{ $t(path) }}</span>
    </div>
</template>