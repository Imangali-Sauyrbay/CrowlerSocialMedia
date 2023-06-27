<script lang="ts" setup>
import { HomeIcon, HashtagIcon, BellIcon, InboxIcon, BookmarkIcon, DocumentTextIcon, UserIcon, EllipsisHorizontalCircleIcon } from '@heroicons/vue/24/outline'
import {
    HomeIcon as HomeIconSolid,
    HashtagIcon as HashtagIconSolid,
    BellIcon as BellIconSolid,
    InboxIcon as InboxIconSolid,
    BookmarkIcon as BookmarkIconSolid,
    DocumentTextIcon as DocumentTextIconSolid,
    UserIcon as UserIconSolid,
    EllipsisHorizontalCircleIcon as EllipsisHorizontalCircleIconSolid
} from '@heroicons/vue/24/solid'

</script>

<template>
    <div class="sidebar-left-container">
        <div class="logo-link-container default-transition">
            <NuxtLink to="/">
                <div class="logo-container">
                    <LogoCrow />
                </div>
            </NuxtLink>
        </div>

        <nav class="space-y-1 ml-1">
            <SidebarLeftTab active :textContent="$t('nav.home')">
                <template #icon="{ isActive }">
                    <HomeIconSolid v-if="isActive" />
                    <HomeIcon v-else />
                </template>
            </SidebarLeftTab>

            <SidebarLeftTab :textContent="$t('nav.explore')">
                <template #icon="{ isActive }">
                    <HashtagIconSolid v-if="isActive" />
                    <HashtagIcon v-else />
                </template>
            </SidebarLeftTab>

            <SidebarLeftTab :textContent="$t('nav.notifications')">
                <template #icon="{ isActive }">
                    <BellIconSolid v-if="isActive" />
                    <BellIcon v-else />
                </template>
            </SidebarLeftTab>

            <SidebarLeftTab :textContent="$t('nav.messages')">
                <template #icon="{ isActive }">
                    <InboxIconSolid v-if="isActive" />
                    <InboxIcon v-else />
                </template>
            </SidebarLeftTab>

            <SidebarLeftTab :textContent="$t('nav.lists')">
                <template #icon="{ isActive }">
                    <DocumentTextIconSolid v-if="isActive" />
                    <DocumentTextIcon v-else />
                </template>
            </SidebarLeftTab>

            <SidebarLeftTab :textContent="$t('nav.bookmarks')">
                <template #icon="{ isActive }">
                    <BookmarkIconSolid v-if="isActive" />
                    <BookmarkIcon v-else />
                </template>
            </SidebarLeftTab>

            <SidebarLeftTab :textContent="$t('nav.user-profile')">
                <template #icon="{ isActive }">
                    <UserIconSolid v-if="isActive" />
                    <UserIcon v-else />
                </template>
            </SidebarLeftTab>


            <SidebarLeftTab :textContent="$t('nav.more')">
                <template #icon="{ isActive }">
                    <EllipsisHorizontalCircleIconSolid v-if="isActive" />
                    <EllipsisHorizontalCircleIcon v-else />
                </template>
            </SidebarLeftTab>
        </nav>
    </div>
</template>

<style scoped>
.logo-container {
    @apply w-8 h-8;
}

.sidebar-left-container {
    @apply flex flex-col h-screen w-min;
}

.logo-link-container {
    @apply p-2 my-2 hover:bg-blue-100 rounded-full w-min dark:hover:bg-white/20;
}
</style>