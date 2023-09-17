<script lang="ts" setup>
const darkMode = useDarkMode();
const isMounted = useIsMounted()
</script>

<template>
    <div class="h-full" :class="{ dark: darkMode }">
        <notifications :class="[isMounted && 'mt-3 mr-3']"/>
        <div class="h-full bg-white dark:bg-dim-900">
            <NuxtLayout>
                <Head>
                    <Title>Crowler</Title>
                    <Link rel="shortcut icon" href="favicon.ico"/>
                </Head>
                <NuxtPage />
            </NuxtLayout>
        </div>
    </div>
</template>