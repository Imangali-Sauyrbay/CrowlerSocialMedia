<script lang="ts" setup>
const { isFirstLoading } = useFirstLoaderBus();
const { useAuthUser, initAuth, useAuthInitializing, logout } = useAuth();
const user = useAuthUser();

const authLoading = useAuthInitializing();
const router = useRouter();

watch([() => authLoading.value, () => user.value], ([loading, user]) => {
    if (!user && !loading) router.push("/auth/login");
});

const handleLogout = () => {
    logout().finally(() => {
        useRouter().push("/auth/login");
    });
};

onBeforeMount(() => {
    initAuth();
});
</script>

<template>
    <div class="h-full w-full">
        <!-- Splash Screen -->
        <SplashScreen v-if="(user && isFirstLoading) || authLoading" />

        <!-- Crowl Modal -->
        <CrowlFormModal v-if="user && !isFirstLoading && !authLoading" />

        <!-- Main Screen -->
        <div
            v-if="user && !isFirstLoading && !authLoading"
            class="mx-auto grid h-full grid-cols-12 sm:px-6 lg:max-w-7xl lg:gap-5 lg:px-8"
        >
            <!-- Left sidebar -->
            <SidebarLeft @logout="handleLogout" />

            <!-- Main Content -->
            <main
                class="main col-span-12 h-full max-h-full w-full overflow-hidden xxs:col-span-11 md:col-span-8 lg:col-span-7"
            >
                <slot></slot>
            </main>

            <!-- Right sidebar -->
            <div
                class="hidden overflow-x-auto scrollbar-none md:col-span-3 md:block"
            >
                <SidebarRight />
            </div>
        </div>
    </div>
</template>

<style>
.main > div {
    @apply h-full;
}
</style>
