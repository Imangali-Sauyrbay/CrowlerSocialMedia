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
const handleDarkModeToggle = (e: KeyboardEvent) => {
    if (e.key.toLowerCase() === "d") {
        darkMode.value = !darkMode.value;
    }
};

onMounted(() => {
    window.addEventListener("keypress", handleDarkModeToggle);
});

onBeforeUnmount(() => {
    window.removeEventListener("keypress", handleDarkModeToggle);
});
</script>

<template>
    <div class="h-full" :class="{ dark: darkMode }">
        <div class="h-full bg-white dark:bg-dim-900">
            <div v-show="!isFirstLoading" class="h-full">
                <div
                    class="mx-auto grid h-full grid-cols-12 sm:px-6 lg:max-w-7xl lg:gap-5 lg:px-8"
                >
                    <!-- Left sidebar  -->
                    <div
                        class="col-span-1 hidden h-full min-w-max overflow-y-auto overflow-x-hidden scrollbar-none xxs:block xl:col-span-2"
                    >
                        <SidebarLeft />
                    </div>

                    <!-- Main Content -->
                    <main
                        class="main col-span-12 h-full w-full xxs:col-span-11 md:col-span-8 xl:col-span-7"
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

            <SplashScreen v-show="isFirstLoading" />
        </div>
    </div>
</template>

<style>
.main > div {
    @apply h-full;
}
</style>
