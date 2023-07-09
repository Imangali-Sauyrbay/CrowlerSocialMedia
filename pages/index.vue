<script lang="ts" setup>
const loading = ref(false);
const { useAuthUser } = useAuth()
const user = useAuthUser()
</script>

<template>
    <div>
        <MainSection
            class="text-black dark:text-white"
            :title="$t('nav.home')"
            :loading="loading"
        >
            <div>User: {{ user }}</div>
        </MainSection>
    </div>
</template>
