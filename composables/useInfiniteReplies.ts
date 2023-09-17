import {
    UseInfiniteQueryReturnType,
    useInfiniteQuery,
} from "@tanstack/vue-query";
import { ExcludedCrowl } from "~/server/database/transformers/crowl";

type CrowlsQuery = {
    crowls: ExcludedCrowl[];
    page: number;
    pages: number;
};

type ReturnType = {
    items: Ref<ExcludedCrowl[]>;
    query: UseInfiniteQueryReturnType<CrowlsQuery, unknown>;
    clearItems: () => void;
};

export default (id: Ref<number | string>): ReturnType => {
    const items = ref<ExcludedCrowl[]>([]);

    const query = useInfiniteQuery<CrowlsQuery, unknown, CrowlsQuery>({
        queryKey: ["crowl_replies"],
        queryFn: ({ signal, pageParam = 1 }) => {
            return $fetch<CrowlsQuery>(`/api/crowls/${id.value}/replies`, {
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

    return {
        items,
        query,
        clearItems: () => {
            items.value = [];
        },
    };
};
