<script lang="ts" setup>
type Types = "posts" | "replies";

const props = defineProps<{
    type?: Types;
}>();

const mapPaths: Record<Types, string> = {
    posts: "crowls.no_posts",
    replies: "crowls.no_replies",
};

const path = computed(() => {
    const type = props.type || "posts";
    return mapPaths[type] ? mapPaths[type] : mapPaths.posts;
});
</script>

<template>
    <div class="flex h-16 items-center justify-center">
        <span class="text-sm font-medium text-gray-600 dark:text-gray-400">{{
            $t(path)
        }}</span>
    </div>
</template>
