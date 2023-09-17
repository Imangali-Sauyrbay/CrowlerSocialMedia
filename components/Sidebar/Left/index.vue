<script lang="ts" setup>
import {
    HomeIcon,
    HashtagIcon,
    BellIcon,
    InboxIcon,
    BookmarkIcon,
    DocumentTextIcon,
    UserIcon,
    EllipsisHorizontalCircleIcon,
    ChevronDownIcon,
} from "@heroicons/vue/24/outline";
import {
    HomeIcon as HomeIconSolid,
    HashtagIcon as HashtagIconSolid,
    BellIcon as BellIconSolid,
    InboxIcon as InboxIconSolid,
    BookmarkIcon as BookmarkIconSolid,
    DocumentTextIcon as DocumentTextIconSolid,
    UserIcon as UserIconSolid,
    EllipsisHorizontalCircleIcon as EllipsisHorizontalCircleIconSolid,
} from "@heroicons/vue/24/solid";

defineEmits<{
    (event: "logout"): void;
}>();

const { handleOpen } = useCrowlModal();
const handleModalOpen = () => handleOpen();

const user = useAuthUser();
const { withDefaultLogo } = useDefaultLogo();

if (!user) {
    useRouter().push("/auth/login");
}
</script>

<template>
    <div class="sidebar-left">
        <div class="sidebar-left-container">
            <div class="logo-link-container default-transition">
                <NuxtLink to="/">
                    <div class="logo-container">
                        <LogoCrow />
                    </div>
                </NuxtLink>
            </div>

            <nav class="space-y-1 xs:ml-1">
                <nuxt-link v-slot="{ navigate, isExactActive }" to="/" custom>
                    <SidebarLeftTab
                        :active="isExactActive"
                        :text-content="$t('nav.home')"
                        @click="navigate"
                    >
                        <template #icon="{ isActive }">
                            <HomeIconSolid v-if="isActive" />
                            <HomeIcon v-else />
                        </template>
                    </SidebarLeftTab>
                </nuxt-link>

                <nuxt-link
                    v-slot="{ navigate, isExactActive }"
                    to="/search"
                    custom
                >
                    <SidebarLeftTab
                        :active="isExactActive"
                        :text-content="$t('nav.explore')"
                        @click="navigate"
                    >
                        <template #icon="{ isActive }">
                            <HashtagIconSolid v-if="isActive" />
                            <HashtagIcon v-else />
                        </template>
                    </SidebarLeftTab>
                </nuxt-link>

                <SidebarLeftTab :text-content="$t('nav.notifications')">
                    <template #icon="{ isActive }">
                        <BellIconSolid v-if="isActive" />
                        <BellIcon v-else />
                    </template>
                </SidebarLeftTab>

                <SidebarLeftTab :text-content="$t('nav.messages')">
                    <template #icon="{ isActive }">
                        <InboxIconSolid v-if="isActive" />
                        <InboxIcon v-else />
                    </template>
                </SidebarLeftTab>

                <SidebarLeftTab :text-content="$t('nav.lists')">
                    <template #icon="{ isActive }">
                        <DocumentTextIconSolid v-if="isActive" />
                        <DocumentTextIcon v-else />
                    </template>
                </SidebarLeftTab>

                <SidebarLeftTab :text-content="$t('nav.bookmarks')">
                    <template #icon="{ isActive }">
                        <BookmarkIconSolid v-if="isActive" />
                        <BookmarkIcon v-else />
                    </template>
                </SidebarLeftTab>

                <SidebarLeftTab :text-content="$t('nav.user-profile')">
                    <template #icon="{ isActive }">
                        <UserIconSolid v-if="isActive" />
                        <UserIcon v-else />
                    </template>
                </SidebarLeftTab>

                <SidebarLeftTab :text-content="$t('nav.more')">
                    <template #icon="{ isActive }">
                        <EllipsisHorizontalCircleIconSolid v-if="isActive" />
                        <EllipsisHorizontalCircleIcon v-else />
                    </template>
                </SidebarLeftTab>
            </nav>

            <div
                class="mt-4 flex w-full flex-grow items-start justify-end font-bold lg:justify-stretch"
            >
                <UIButton
                    :custom-size="true"
                    class="ml-auto mr-[0.15rem] p-2 lg:hidden"
                    @click="handleModalOpen"
                >
                    <IconFeather class="h-5 w-5" />
                </UIButton>

                <UIButton
                    :liquid="true"
                    size="lg"
                    class="hidden lg:block"
                    @click="handleModalOpen"
                >
                    Crowl
                </UIButton>
            </div>

            <div
                class="default-transition mb-5 ml-auto mt-auto flex w-14 cursor-pointer flex-row items-center justify-center rounded-full px-2 py-2 hover:bg-gray-100 dark:hover:bg-dim-800 xl:w-full"
                @click="$emit('logout')"
            >
                <div class="flex flex-row">
                    <img
                        :src="withDefaultLogo(user?.profile)"
                        class="h-10 w-10 rounded-full"
                    />
                    <div class="ml-2 hidden flex-col lg:block">
                        <h1
                            class="text-sm font-bold text-gray-800 dark:text-white"
                        >
                            {{ user?.name }}
                        </h1>
                        <p class="text-sm text-gray-400">
                            @{{ user?.username }}
                        </p>
                    </div>
                </div>

                <!-- ICON -->
                <div class="ml-auto hidden lg:block">
                    <div class="h-6 w-6 text-gray-800 dark:text-white">
                        <ChevronDownIcon />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.logo-container {
    @apply h-7 w-7;
}

.sidebar-left {
    @apply col-span-1 hidden h-full min-w-max overflow-y-auto overflow-x-hidden scrollbar-none xxs:block lg:col-span-2;
}

.sidebar-left-container {
    @apply flex h-full w-full flex-col items-end pr-2 lg:items-start lg:pl-2 lg:pr-0;
}

.logo-link-container {
    @apply my-2 w-min rounded-full p-1 hover:bg-blue-100 dark:hover:bg-white/20 xs:p-2;
}
</style>
