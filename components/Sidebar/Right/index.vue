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
    <div class="flex flex-col w-full">
        <SidebarRightPreviewCard :title="$t('sidebar.right.titles.news')">
            <SidebarRightPreviewCardItem v-for="{ title, count } in whatsHappening">
                <div>
                    <h2 class="font-bold text-gray-800 text-md dark:text-gray-200">
                        {{ title }}
                    </h2>
                    <p class="text-xs text-gray-400">{{ HRNumbers(count) }} Croaks</p>
                </div>
            </SidebarRightPreviewCardItem>
        </SidebarRightPreviewCard>

        <SidebarRightPreviewCard :title="$t('sidebar.right.titles.to-follow')">
            <SidebarRightPreviewCardItem v-for="{ name, handle, image } in whoToFollow" :make-interactive="false">
                <div class="flex flex-row justify-start p-2 items-center">
                    <div class="flex flex-row w-full">
                        <img class="w-10 h-10 rounded-full" :src="image" :alt="handle" />

                        <div class="flex flex-col ml-2 overflow-clip">
                            <h1 class="text-sm font-bold text-gray-900 dark:text-gray-200">
                                {{ name }}
                            </h1>
                            <p class="text-xs text-gray-500">{{ handle }}</p>
                        </div>
                    </div>

                    <button class="default-transition btn px-4 py-2 font-bold text-xs rounded-full text-white dark:text-black hover:bg-gray-700 dark:hover:bg-gray-400 bg-gray-900 dark:bg-gray-200">{{ $t('sidebar.right.follow') }}</button>
                </div>
            </SidebarRightPreviewCardItem>
        </SidebarRightPreviewCard>
    </div>
</template>

<style scoped>
.btn:active {
    transform: scale(.9);
}
</style>
