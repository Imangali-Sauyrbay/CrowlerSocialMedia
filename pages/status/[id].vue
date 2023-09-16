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

const {refetch, data, isLoading} = useQuery({
    queryKey: ['crowl_by_id'],
    queryFn: () => $fetch<{crowl: ExcludedCrowl}>(`/api/crowls/${getId()}`)
})

watch(() => route.fullPath, () => refetch())

onBeforeMount(() => {
    if(! user.value) return router.push('/auth/login')
})
</script>

<template>
     <MainSection title="Crowl" :loading="isLoading">

        <Head>
            <Title>Crowl - {{ data?.crowl?.text?.slice(0, 20) }}...</Title>
        </Head>

        <CrowlDetails :crowl="data?.crowl" />
    </MainSection>
</template>
