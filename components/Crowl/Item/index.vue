<script lang="ts" setup>
import { ExcludedCrowl } from "~/server/database/transformers/crowl";

const props = defineProps<{
    crowl: ExcludedCrowl;
    compact?: boolean;
    compactImage?: boolean;
    hideActions?: boolean;
}>();

const marginLeft = computed(() => (props.compact ? "ml-16" : "mx-2 mt-4"));
const textSize = computed(() => (props.compact ? "text-base" : "text-2xl"));

const images = computed<[string, string][]>(
    () =>
        props.crowl.medias?.map((media) => [media.name, media.url || ""]) || [],
);

const bus = useCrowlModalEvents();

const handleReply = () => {
    bus.emit("open", { replyTo: props.crowl });
};
</script>

<template>
    <div v-bind="$attrs">
        <CrowlItemHeader :item="crowl" />

        <div :class="marginLeft">
            <pre
                class="w-auto whitespace-pre-wrap break-words font-medium text-gray-800 dark:text-white"
                :class="textSize"
                >{{ crowl.text }}</pre
            >
            <UIImages
                :closable="false"
                :images="images"
                :compact="compactImage"
            />
        </div>

        <div v-if="!hideActions" class="ml-16 mt-3">
            <CrowlItemActions
                :item="crowl"
                :compact="compact"
                @comment-click="handleReply"
            />
        </div>
    </div>
</template>
