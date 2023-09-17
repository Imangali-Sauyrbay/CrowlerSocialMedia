<script lang="ts" setup>
const {
    items,
    invalidate,
    query: { hasNextPage, fetchNextPage, isFetching },
} = useInfiniteCrowls();

const invalidateQueries = () => {
    invalidate();
};
</script>

<template>
    <MainSection
        class="text-black dark:text-white"
        :title="$t('nav.home')"
        :loading="false"
    >
        <Head>
            <Title>Home</Title>
        </Head>

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
                <CrowlForm @success="invalidateQueries" />
            </template>
        </CrowlListFeed>
    </MainSection>
</template>
