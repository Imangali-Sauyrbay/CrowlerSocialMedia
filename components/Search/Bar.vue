<script lang="ts" setup>
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
const search = ref('')

const handleSearch = () => {
    const query = search.value
    search.value = ''
    
    useRouter()
    .push({
        path: '/search',
        query: {
            q: query
        }
    })
}
</script>

<template>
    <div class="relative m-2">
        <div class="absolute flex items-center h-full pl-4 text-gray-600 cursor-pointer">
            <div class="w-6 h-6 hover:text-white hover:scale-110 default-transition">
                <MagnifyingGlassIcon @click="handleSearch"/>
            </div>
        </div>
        <input
            v-model="search"
            class="flex items-center w-full pl-12 text-sm font-normal text-black bg-gray-200 border border-gray-200 rounded-full shadow dark:text-gray-100 dark:bg-dim-400 dark:border-dim-400 focus:bg-gray-100 dark:focus:bg-dim-900 focus:outline-none focus:border focus:border-blue-200 h-9"
            :placeholder="$t('search.placeholder')"
            type="text"
            @keypress.enter="handleSearch"
        >
    </div>
</template>