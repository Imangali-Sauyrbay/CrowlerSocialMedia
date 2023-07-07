<script lang="ts" setup>
useHead({
    title: "Crowler",
    link: [
        {
            rel: "shortcut icon",
            href: "favicon.ico",
        },
    ],
});

const darkMode = useDarkMode();

const { isFirstLoading } = useFirstLoaderBus();
const { useAuthUser } = useAuth()
const user = useAuthUser()
</script>

<template>
    <div class="h-full" :class="{ dark: darkMode }">
        <div class="h-full bg-white dark:bg-dim-900">
            <!-- App -->
            <div v-if="user" class="h-full">
                <!-- Main Screen -->
                <div
                    v-show="!isFirstLoading"
                    class="mx-auto grid h-full grid-cols-12 sm:px-6 lg:max-w-7xl lg:gap-5 lg:px-8"
                >
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

                <!-- Splash Screen -->
                <SplashScreen v-show="isFirstLoading" />
            </div>

            <!-- Auth -->
            <AuthPage v-else/>
        </div>
    </div>
</template>

<style>
.main > div {
    @apply h-full;
}
</style>
