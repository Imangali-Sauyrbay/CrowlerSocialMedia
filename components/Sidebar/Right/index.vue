<script setup lang="ts">
const whatsHappening = [
    {
        title: "Space X",
        count: 1557800,
    },
    {
        title: "#HelloWorld",
        count: 99_900_000_000,
    },
    {
        title: "#artforall",
        count: 188,
    },
    {
        title: "#EggFromInstagramm",
        count: 59_956,
    },
];

const whoToFollow = [
    {
        name: "American Alone Guy",
        handle: "@JoeBiden",
        image: "https://picsum.photos/200/200",
    },
    {
        name: "Eel On Musk",
        handle: "@eelOnMusk",
        image: "https://picsum.photos/200/200",
    },
    {
        name: "Weird Guy",
        handle: "@WeirdGuy",
        image: "https://picsum.photos/200/200",
    },
];
</script>

<template>
    <div class="flex w-full flex-col">
        <SidebarRightPreviewCard :title="$t('sidebar.right.titles.news')">
            <SidebarRightPreviewCardItem
                v-for="{ title, count } in whatsHappening"
                :key="`${title}-${count}`"
            >
                <div>
                    <h2
                        class="text-md font-bold text-gray-800 dark:text-gray-200"
                    >
                        {{ title }}
                    </h2>
                    <p class="text-xs text-gray-400">
                        {{ HRNumbers(count) }} Croaks
                    </p>
                </div>
            </SidebarRightPreviewCardItem>
        </SidebarRightPreviewCard>

        <SidebarRightPreviewCard :title="$t('sidebar.right.titles.to-follow')">
            <SidebarRightPreviewCardItem
                v-for="{ name, handle, image } in whoToFollow"
                :key="`${name}-${handle}-${image}`"
                :make-interactive="false"
            >
                <div class="flex flex-row items-center justify-start p-2">
                    <div class="flex w-full flex-row">
                        <img
                            class="h-10 w-10 rounded-full"
                            :src="image"
                            :alt="handle"
                        />

                        <div class="ml-2 flex flex-col overflow-clip">
                            <h1
                                class="text-sm font-bold text-gray-900 dark:text-gray-200"
                            >
                                {{ name }}
                            </h1>
                            <p class="text-xs text-gray-500">{{ handle }}</p>
                        </div>
                    </div>

                    <button
                        class="default-transition btn rounded-full bg-gray-900 px-4 py-2 text-xs font-bold text-white hover:bg-gray-700 dark:bg-gray-200 dark:text-black dark:hover:bg-gray-400"
                    >
                        {{ $t("sidebar.right.follow") }}
                    </button>
                </div>
            </SidebarRightPreviewCardItem>
        </SidebarRightPreviewCard>
    </div>
</template>

<style scoped>
.btn:active {
    transform: scale(0.9);
}
</style>
