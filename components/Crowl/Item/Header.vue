<script lang="ts" setup>
import { ExcludedCrowl } from "~/server/database/transformers/crowl";
const { withDefaultLogo } = useDefaultLogo();

const props = defineProps<{
    item: ExcludedCrowl;
}>();

const replyToUrl = computed(() => `/status/${props.item.replied_to?.id}`);
</script>

<template>
    <div class="flex h-[63px] pl-4 pt-4">
        <div>
            <img
                class="h-10 w-10 rounded-full"
                :src="withDefaultLogo(item.author?.profile)"
                :alt="item.author?.name || ''"
            />
        </div>

        <div class="ml-3">
            <span class="font-medium text-gray-800 dark:text-white">{{
                item.author?.name
            }}</span>

            <span
                class="ml-3 text-sm font-medium text-gray-600 dark:text-gray-400"
            >
                <NuxtLink to="#"> @{{ item.author?.username }} </NuxtLink>
                &middot;
                {{ HRDate(item.created_at) }}
            </span>
            <p v-if="item.replied_to" class="text-sm">
                <span class="text-gray-600 dark:to-gray-500">
                    Replying to
                </span>

                <nuxt-link
                    class="text-blue-600 dark:text-blue-400"
                    :to="replyToUrl"
                >
                    @{{ item.replied_to.author?.username }}
                </nuxt-link>
            </p>
        </div>
    </div>
</template>
