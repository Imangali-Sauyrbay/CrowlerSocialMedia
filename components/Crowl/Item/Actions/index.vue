<script lang="ts" setup>
import {
    ChatBubbleOvalLeftEllipsisIcon,
    ArrowPathIcon,
    HeartIcon,
    ArrowUpTrayIcon,
} from "@heroicons/vue/24/outline";
import { ExcludedCrowl } from "~/server/database/transformers/crowl";

const emits = defineEmits<{
    (event: "commentClick"): void;
}>();

const props = defineProps<{
    item: ExcludedCrowl;
    compact?: boolean;
}>();

const showStats = computed(() => !!props.compact);
const size = computed(() => (props.compact ? 5 : 8));
</script>

<template>
    <div class="flex w-full items-center justify-around">
        <CrowlItemActionsIcon
            color="blue"
            :size="size"
            @click="emits('commentClick')"
        >
            <template #icon="{ classes }">
                <ChatBubbleOvalLeftEllipsisIcon :class="classes" />
            </template>

            <template v-if="showStats" #default>
                {{ item?._count && item?._count["replies"] }}
            </template>
        </CrowlItemActionsIcon>

        <CrowlItemActionsIcon color="green" :size="size">
            <template #icon="{ classes }">
                <ArrowPathIcon :class="classes" />
            </template>

            <template v-if="showStats" #default>
                {{ HRNumbers(random(10, 10000)) }}
            </template>
        </CrowlItemActionsIcon>

        <CrowlItemActionsIcon color="red" :size="size">
            <template #icon="{ classes }">
                <HeartIcon :class="classes" />
            </template>

            <template v-if="showStats" #default>
                {{ HRNumbers(random(10, 100000)) }}
            </template>
        </CrowlItemActionsIcon>

        <CrowlItemActionsIcon color="blue" :size="size">
            <template #icon="{ classes }">
                <ArrowUpTrayIcon :class="classes" />
            </template>

            <template v-if="showStats" #default>
                {{ HRNumbers(random(10, 10000)) }}
            </template>
        </CrowlItemActionsIcon>
    </div>
</template>
