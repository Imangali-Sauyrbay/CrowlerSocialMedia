<script lang="ts" setup>
const darkMode = useDarkMode();
if(process.client) window.addEventListener('keypress', (e: KeyboardEvent) => {
    if(e.code === 'Numpad1') darkMode.value = !darkMode.value
})
</script>

<template>
    <div class="h-full" :class="{ dark: darkMode }">
        <notifications />
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