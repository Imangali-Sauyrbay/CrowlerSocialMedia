import {
    UseInfiniteQueryReturnType,
    useInfiniteQuery,
    useQueryClient,
} from "@tanstack/vue-query";
import { ExcludedCrowl } from "~/server/database/transformers/crowl";

type CrowlsQuery = {
    crowls: ExcludedCrowl[];
    page: number;
    pages: number;
};

type InfiniteCrowlsReturn = {
    items: Ref<ExcludedCrowl[]>;
    query: UseInfiniteQueryReturnType<CrowlsQuery, unknown>;
    invalidate: () => void;
};

const KEY = ["crowls"];

export default (): InfiniteCrowlsReturn => {
    const items = ref<ExcludedCrowl[]>([]);

    const query = useInfiniteQuery<CrowlsQuery, unknown, CrowlsQuery>({
        queryKey: KEY,
        queryFn: ({ signal, pageParam = 1 }) => {
            return $fetch<CrowlsQuery>("/api/crowls", {
                signal,
                query: {
                    page: pageParam,
                },
            });
        },

        getNextPageParam: (last) => {
            const page = last.page + 1;
            return page > last.pages ? undefined : page;
        },

        onSuccess: ({ pages }) => {
            items.value = pages.reduce<ExcludedCrowl[]>((acc, page) => {
                acc.push(...page.crowls);
                return acc;
            }, []);
        },
    });

    const queryClient = useQueryClient();

    const invalidate = (pageIndex: number = 0): void => {
        queryClient.invalidateQueries({
            queryKey: KEY,
            refetchPage: (_, i) => i === pageIndex,
        });
    };

    return {
        items,
        query,
        invalidate,
    };
};
