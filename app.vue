<script lang="ts" setup>
useHead({
    title: "Crowler",
    link: [{
        rel: 'shortcut icon',
        href: 'favicon.ico'
    }]
})

const darkMode = useDarkMode()

const { isFirstLoading } = useFirstLoaderBus()
const handleDarkModeToggle = (e: KeyboardEvent) => {
    if (e.key.toLowerCase() === 'd') {
        darkMode.value = !darkMode.value
    }
}

onMounted(() => {
    window.addEventListener('keypress', handleDarkModeToggle)
})

onBeforeUnmount(() => {
    window.removeEventListener('keypress', handleDarkModeToggle)
})
</script>

<template>
    <div class="h-full" :class="{dark: darkMode}">
        <div class="h-full bg-white dark:bg-dim-900">
            
            <div class="h-full" v-show="!isFirstLoading">
                <div class="h-full grid grid-cols-12 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:gap-5">

                    <!-- Left sidebar  -->
                    <div class="hidden xxs:block col-span-1 xl:col-span-2 min-w-max overflow-x-hidden overflow-y-auto h-full scrollbar-none">
                        <SidebarLeft />
                    </div>

                    <!-- Main Content -->
                    <main class="main col-span-12 xxs:col-span-11 md:col-span-8 xl:col-span-7 h-full w-full">
                        <NuxtPage />
                    </main>

                    <!-- Right sidebar -->
                    <div class="hidden md:block md:col-span-3 overflow-x-auto scrollbar-none">
                        <SidebarRight />
                    </div>

                </div>
            </div>

            <SplashScreen v-show="isFirstLoading"/>
        </div>
    </div>
</template>

<style>
    .main > div {
        @apply h-full;
    }
</style>
