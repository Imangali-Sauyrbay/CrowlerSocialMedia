<script lang="ts" setup>
import { ExcludedCrowl } from '~/server/database/transformers/crowl';
const props = defineProps<{
    crowl: ExcludedCrowl
}>()

const replies = computed(() => props.tweet?.replies || [])

function handleFormSuccess(tweet) {
    navigateTo({
        path: `/status/${tweet.id}`
    })
}
</script>

<template>
    <div>
        <CrowlItem :crowl="props.crowl" />

        <CrowlForm placeholder="Tweet your reply" :reply-to="props.tweet" :user="props.user"
            @on-success="handleFormSuccess" />

        <CrowlListFeed :item="replies" />
    </div>
</template>