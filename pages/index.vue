<script lang="ts" setup>
const loading = ref(false)
</script>

<template>
    <div>
        <MainSection :title="$t('nav.home')" :loading="loading">
            <p class="my-96">Content</p>
        </MainSection>
    </div>
</template>