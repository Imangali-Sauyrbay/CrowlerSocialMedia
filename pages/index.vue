<script lang="ts" setup>
const loading = ref(false);
</script>

<template>
    <MainSection
        class="text-black dark:text-white"
        :title="$t('nav.home')"
        :loading="loading"
    >
        <CrowlForm />
    </MainSection>
</template>
