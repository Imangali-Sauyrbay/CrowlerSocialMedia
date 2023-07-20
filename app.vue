<script lang="ts" setup>
const darkMode = useDarkMode();

const { isFirstLoading } = useFirstLoaderBus();
const { useAuthUser, initAuth, useAuthInitializing } = useAuth()
const user = useAuthUser()

const authLoading = useAuthInitializing()

onBeforeMount(() => {
    initAuth()

    if(process.client) window.addEventListener('keypress', (e: KeyboardEvent) => {
        if(e.code === 'Numpad1') darkMode.value = !darkMode.value
    })
})
</script>

<template>
    <Head>
        <Title>Crowler</Title>
        <Link rel="shortcut icon" href="favicon.ico"/>
    </Head>

    <div class="h-full" :class="{ dark: darkMode }">
        <div class="h-full bg-white dark:bg-dim-900">

            <!-- Splash Screen -->
            <SplashScreen v-if="(user && isFirstLoading) || authLoading" />

             <!-- App Page -->
            <AuthPage v-if="!user && !authLoading"/>

            <!-- Main Screen -->
            <div
                v-if="user && !isFirstLoading && !authLoading"
                class="mx-auto grid h-full grid-cols-12 sm:px-6 lg:max-w-7xl lg:gap-5 lg:px-8"
            >
                <!-- Left sidebar -->
                <SidebarLeft />

                <!-- Main Content -->
                <main
                    class="main col-span-12 h-full max-h-screen w-full xxs:col-span-11 md:col-span-8 xl:col-span-7"
                >
                    <NuxtPage />
                </main>

                <!-- Right sidebar -->
                <div
                    class="hidden overflow-x-auto scrollbar-none md:col-span-3 md:block"
                >
                    <SidebarRight />
                </div>
            </div>

        </div>
    </div>
</template>

<style>
.main > div {
    @apply h-full;
}
</style>
