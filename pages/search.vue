<script setup lang="ts">
const route = useRoute();

const getSearchQuery = (): string => {
    const id = route.query.q;
    if (Array.isArray(id)) return id.join("");
    return id ?? "";
};

const toSearch = ref<string>(getSearchQuery());

const {
    items,
    invalidate,
    query: { hasNextPage, fetchNextPage, isFetching },
} = useInfiniteSearchCrowl(toSearch);

watch(
    () => route.fullPath,
    () => {
        toSearch.value = getSearchQuery();
        invalidate();
    },
);
</script>

<template>
    <MainSection
        :title="$t('search.results', { query: toSearch })"
        :loading="false"
    >
        <Head>
            <Title>Search - Crowl</Title>
        </Head>

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
                    <SearchBar />
                </template>
                <template #noMore>
                    <CrowlListNoMore v-if="!hasNextPage" type="replies" />
                </template>
            </CrowlListFeed>
        </div>
    </MainSection>
</template>
