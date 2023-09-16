import { ExcludedCrowl } from '~/server/database/transformers/crowl'
import { useInfiniteQuery } from '@tanstack/vue-query';

type CrowlsQuery = {
    crowls: ExcludedCrowl[],
    page: number,
    pages: number
}

export default () => {
    const items = ref<ExcludedCrowl[]>([])

    const query = useInfiniteQuery<CrowlsQuery, unknown, CrowlsQuery>({
        queryKey: ['crowls'],
        queryFn: ({ signal, pageParam = 1 }) => {
            return $fetch<CrowlsQuery>('/api/crowls', {
                signal,
                query: {
                    page: pageParam
                }
            })
        },

        getNextPageParam: (last) => {
            const page = last.page + 1
            return (page > last.pages) ? undefined : page
        },

        onSuccess: ({ pages }) => {
            items.value = pages.reduce<ExcludedCrowl[]>((acc, page) => {
                acc.push(...page.crowls)
                return acc
            }, [])
        }
    })

    return {
        items,
        query
    }
}