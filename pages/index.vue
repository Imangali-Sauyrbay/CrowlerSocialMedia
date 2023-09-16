<script lang="ts" setup>
const { items, query: {
    hasNextPage,
    fetchNextPage,
    isFetching
} } = useInfiniteCrowls()

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

        <CrowlListFeed>
            <template #top>
                <CrowlForm />
            </template>

        </CrowlListFeed>
        
    </MainSection>
</template>
