<script lang="ts" setup>
import { ExcludedCrowl } from "~/server/database/transformers/crowl";

const props = defineProps<{
    crowl: ExcludedCrowl;
}>();

const id = ref<number>(props.crowl.id);

const {
    items,
    query: { hasNextPage, fetchNextPage, isFetching },
} = useInfiniteReplies(id);
</script>

<template>
    <div class="h-full w-full">
        <CrowlListFeed
            :items="items"
            :fetch-next-page="
                () => {
                    fetchNextPage();
                }
            "
            :is-fetching="isFetching"
            :has-next-page="hasNextPage"
        >
            <template #top>
                <CrowlItem
                    :crowl="crowl"
                    class="default-border-color border-b pb-4"
                />

                <CrowlForm
                    :placeholder="$t('crowls.reply_placeholder')"
                    :reply-to="id"
                    @success="handleFormSuccess"
                />
            </template>

            <template #noMore>
                <CrowlListNoMore v-if="!hasNextPage" type="replies" />
            </template>
        </CrowlListFeed>
    </div>
</template>
