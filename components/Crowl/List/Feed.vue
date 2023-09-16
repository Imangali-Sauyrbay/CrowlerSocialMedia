<script lang="ts" setup>
import {
    DEFAULT_CLIENT_WIDTH,
    DEFAULT_LETTER_WIDTH,
    IMAGE_ITEM_HEIGHT,
    LINE_OF_TEXT_HEIGHT,
    PADDING_BOTTOM,
    CROWL_HEADER_HEIGHT,
    CROWL_ACTIONS_HEIGHT
} from '~/constants/CROWLS';
import { ExcludedCrowl } from '~/server/database/transformers/crowl';

const props = defineProps<{
    hasNextPage: boolean,
    fetchNextPage: () => void,
    isFetching: boolean,
    items: ExcludedCrowl[]
}>()

const { list, containerProps, wrapperProps } = useVirtualList(
    props.items,
    {
        itemHeight: (i) => {
            const width = containerProps.ref.value?.clientWidth || DEFAULT_CLIENT_WIDTH
            const currentItem = props.items.value[i]

            let linesTakenByText = 0

            currentItem.text.split(/\r?\n/).forEach(text => {
                linesTakenByText += Math.ceil((text.length * DEFAULT_LETTER_WIDTH) / width)
            })

            const imageHeight = ((currentItem.medias?.length || 0) > 0 ? IMAGE_ITEM_HEIGHT : 0)

            const expectedHeight = linesTakenByText * LINE_OF_TEXT_HEIGHT +
            PADDING_BOTTOM +
            CROWL_HEADER_HEIGHT +
            CROWL_ACTIONS_HEIGHT +
            imageHeight

            return expectedHeight
        },
    },
)

useInfiniteScroll(
    containerProps.ref,
    () => {
        if(props.hasNextPage && !props.isFetching) props.fetchNextPage()
    },
    {
        distance: 200
    }
)
</script>


<template>
<div v-bind="containerProps" class="h-full offset-padding overflow-x-hidden overflow-y-auto scrollbar-none">
    <slot name="top"></slot>

    <div v-bind="wrapperProps">
        <div
            class="pb-4 pr-2 border-b hover:bg-gray-100 dark:hover:bg-dim-700 default-border-color default-transition"
            v-for="item in list" :key="item.data.id"
        >
            <CrowlItem :crowl="item.data"/>
        </div>
    </div>

    <CrowlListNoMore v-if="!hasNextPage" />
    <CrowlListLoading v-if="isFetching && hasNextPage" />
</div>
</template>