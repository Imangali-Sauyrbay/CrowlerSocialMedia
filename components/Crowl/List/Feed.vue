<script lang="ts" setup>
import {
    DEFAULT_CLIENT_WIDTH,
    DEFAULT_LETTER_WIDTH,
    IMAGE_ITEM_HEIGHT,
    LINE_OF_TEXT_HEIGHT,
    PADDING_BOTTOM,
    CROWL_HEADER_HEIGHT,
    CROWL_ACTIONS_HEIGHT,
} from "~/constants/CROWLS";
import { ExcludedCrowl } from "~/server/database/transformers/crowl";

const props = defineProps<{
    hasNextPage: boolean | undefined;
    fetchNextPage: () => void;
    isFetching: boolean;
    items: ExcludedCrowl[];
}>();

const crowls = computed(() => props.items);

const { list, containerProps, wrapperProps } = useVirtualList(crowls, {
    itemHeight: (i) => {
        const width =
            containerProps.ref.value?.clientWidth || DEFAULT_CLIENT_WIDTH;
        const currentItem = crowls.value[i];

        let linesTakenByText = 0;

        currentItem.text.split(/\r?\n/).forEach((text) => {
            linesTakenByText += Math.ceil(
                (text.length * DEFAULT_LETTER_WIDTH) / width,
            );
        });

        const imageHeight =
            (currentItem.medias?.length || 0) > 0 ? IMAGE_ITEM_HEIGHT : 0;

        const expectedHeight =
            linesTakenByText * LINE_OF_TEXT_HEIGHT +
            PADDING_BOTTOM +
            CROWL_HEADER_HEIGHT +
            CROWL_ACTIONS_HEIGHT +
            imageHeight;

        return expectedHeight;
    },
});

useInfiniteScroll(
    containerProps.ref,
    () => {
        if (props.hasNextPage && !props.isFetching) props.fetchNextPage();
    },
    {
        distance: 200,
    },
);
</script>

<template>
    <div
        v-bind="containerProps"
        class="offset-padding h-full overflow-y-auto overflow-x-hidden scrollbar-none"
    >
        <slot name="top"></slot>

        <div v-bind="wrapperProps">
            <div
                v-for="item in list"
                :key="item.data.id"
                class="default-border-color default-transition border-b pb-4 pr-2 hover:bg-gray-100 dark:hover:bg-dim-700"
            >
                <nuxt-link :to="'/status/' + item.data.id">
                    <CrowlItem :crowl="item.data" compact />
                </nuxt-link>
            </div>
        </div>

        <slot name="noMore" :has-next-page="hasNextPage">
            <CrowlListNoMore v-if="!hasNextPage" />
        </slot>

        <slot
            name="loader"
            :is-fetching="isFetching"
            :has-next-page="hasNextPage"
        >
            <CrowlListLoading v-if="isFetching && hasNextPage" />
        </slot>
    </div>
</template>
