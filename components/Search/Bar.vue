<script lang="ts" setup>
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";
const search = ref("");

const handleSearch = () => {
    const query = search.value;
    search.value = "";

    useRouter().push({
        path: "/search",
        query: {
            q: query,
        },
    });
};
</script>

<template>
    <div class="relative m-2">
        <div
            class="absolute flex h-full cursor-pointer items-center pl-4 text-gray-600"
        >
            <div
                class="default-transition h-6 w-6 hover:scale-110 hover:text-white"
            >
                <MagnifyingGlassIcon @click="handleSearch" />
            </div>
        </div>
        <input
            v-model="search"
            class="flex h-9 w-full items-center rounded-full border border-gray-200 bg-gray-200 pl-12 text-sm font-normal text-black shadow focus:border focus:border-blue-200 focus:bg-gray-100 focus:outline-none dark:border-dim-400 dark:bg-dim-400 dark:text-gray-100 dark:focus:bg-dim-900"
            :placeholder="$t('search.placeholder')"
            type="text"
            @keypress.enter="handleSearch"
        />
    </div>
</template>
