<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { ExcludedCrowl } from '~/server/database/transformers/crowl';

const user = useAuthUser()

const route = useRoute()
const router = useRouter()

const getId = () => {
    const id = route.params['id']
    if(Array.isArray(id)) return id.join('')
    return id
}

const { data, isLoading  } = useQuery({
    queryKey: ['crowl_by_id_' + getId()],
    queryFn: () => $fetch<{crowl: ExcludedCrowl}>(`/api/crowls/${getId()}`),
    keepPreviousData: false,
})

onBeforeMount(() => {
    if(! user.value) return router.push('/auth/login')
})
</script>

<template>
     <MainSection title="Crowl" :loading="isLoading">

        <Head>
            <Title>Crowl - {{ data?.crowl?.text?.slice(0, 20) }}...</Title>
        </Head>
        <div v-if="data?.crowl.id" class="h-full w-full">
            <CrowlDetails :crowl="data?.crowl"/>
        </div>
    </MainSection>
</template>
