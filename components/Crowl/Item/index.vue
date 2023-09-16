<script lang="ts" setup>
import { ExcludedCrowl } from '~/server/database/transformers/crowl'

const props = defineProps<{
    crowl: ExcludedCrowl
}>()

const images = computed<([string, string][])>(
    () => props.crowl.medias?.map((media) => [media.name, media.url || '']) || []
)
</script>

<template>
    <CrowlItemHeader :item="crowl" />
    <div class="ml-16">
        <pre class="break-words whitespace-pre-wrap font-medium text-gray-800 w-auto dark:text-white">{{crowl.text}}</pre>
        <UIImages :closable="false" :images="images"/>
    </div>

    <div class="ml-16 mt-3">
        <CrowlItemActions :item="crowl" compact/>
    </div>
</template>