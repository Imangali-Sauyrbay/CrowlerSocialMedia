<script lang="ts" setup>
import { ExcludedCrowl } from '~/server/database/transformers/crowl'

const props = defineProps<{
    crowl: ExcludedCrowl
    compact?: boolean
}>()

const marginLeft = computed(() => props.compact ? 'ml-16' : 'mx-2 mt-4')
const textSize = computed(() => props.compact ? 'text-base' : 'text-2xl')

const images = computed<([string, string][])>(
    () => props.crowl.medias?.map((media) => [media.name, media.url || '']) || []
)
</script>

<template>
    <div v-bind="$attrs">
        <CrowlItemHeader :item="crowl" />
        
        <div :class="marginLeft">
            <pre
                class="break-words whitespace-pre-wrap font-medium text-gray-800 w-auto dark:text-white"
                :class="textSize"
            >{{crowl.text}}</pre>
            <UIImages :closable="false" :images="images" />
        </div>

        <div class="ml-16 mt-3">
            <CrowlItemActions :item="crowl" :compact="compact"/>
        </div>
    </div>
</template>