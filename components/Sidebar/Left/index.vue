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
                <SidebarLeftTab active :text-content="$t('nav.home')">
                    <template #icon="{ isActive }">
                        <HomeIconSolid v-if="isActive" />
                        <HomeIcon v-else />
                    </template>
                </SidebarLeftTab>

                <SidebarLeftTab :text-content="$t('nav.explore')">
                    <template #icon="{ isActive }">
                        <HashtagIconSolid v-if="isActive" />
                        <HashtagIcon v-else />
                    </template>
                </SidebarLeftTab>

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

            <div class="flex-grow w-full mt-4 font-bold">
                <UIButton :liquid="true" size="lg">
                    Crowl
                </UIButton>
            </div>
        </div>
    </div>
</template>

<style scoped>
.logo-container {
    @apply h-7 w-7;
}

.sidebar-left {
    @apply col-span-1 hidden h-full min-w-max overflow-y-auto overflow-x-hidden scrollbar-none xxs:block xl:col-span-2;
}

.sidebar-left-container {
    @apply flex h-full w-full flex-col items-end pr-2 xl:items-start xl:pl-2 xl:pr-0;
}

.logo-link-container {
    @apply my-2 w-min rounded-full p-1 hover:bg-blue-100 dark:hover:bg-white/20 xs:p-2;
}
</style>
