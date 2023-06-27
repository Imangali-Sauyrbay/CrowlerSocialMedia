<script lang="ts" setup>

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
    <div class="min-h-full" :class="{dark: darkMode}">
        <div class="min-h-screen bg-white dark:bg-dim-900">
            
            <div class="min-h-full" v-show="!isFirstLoading">
                <div class="grid grid-cols-12 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:gap-5">

                    <!-- Left sidebar  -->

                    <div class="hidden xxs:block col-span-1 xl:col-span-2 min-w-min px-1">
                        <SidebarLeft />
                    </div>
                    <!-- Main Content -->

                    <!-- Right sidebar -->

                </div>
            </div>

            <SplashScreen v-show="isFirstLoading"/>
        </div>
    </div>
</template>
