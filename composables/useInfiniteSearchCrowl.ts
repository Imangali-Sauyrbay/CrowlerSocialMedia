import { ExcludedCrowl } from '~/server/database/transformers/crowl'
import { UseInfiniteQueryReturnType, useInfiniteQuery, useQueryClient } from '@tanstack/vue-query';

type CrowlsQuery = {
    crowls: ExcludedCrowl[],
    page: number,
    pages: number
}

type InfiniteCrowlsReturn = {
    items: Ref<ExcludedCrowl[]>,
    query: UseInfiniteQueryReturnType<CrowlsQuery, unknown>,
    invalidate: () => void
}

const KEY = ['crowls-search']

export default (toSearch: Ref<string>): InfiniteCrowlsReturn => {
    const items = ref<ExcludedCrowl[]>([])

    const query = useInfiniteQuery<CrowlsQuery, unknown, CrowlsQuery>({
        queryKey: KEY,
        queryFn: ({ signal, pageParam = 1 }) => {
            return $fetch<CrowlsQuery>('/api/crowls/search', {
                signal,
                query: {
                    page: pageParam,
                    q: toSearch.value
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
        },
    })

    const queryClient = useQueryClient()

    const invalidate = (): void => {
        queryClient.invalidateQueries({queryKey: KEY})
    }

    return {
        items,
        query,
        invalidate
    }
}