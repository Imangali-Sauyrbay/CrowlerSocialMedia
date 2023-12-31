export const convertMapToRecord = <K extends keyof any, V>(
    map: Map<K, V>,
): Record<K, V> => {
    const record = {} as Record<K, V>;

    for (const [key, value] of map.entries()) {
        record[key] = value;
    }

    return record;
};

type $FetchParams = Parameters<typeof $fetch>;

export const useFetchApi = <T = unknown>(
    url: $FetchParams[0],
    options: NonNullable<$FetchParams[1]> = {},
) => {
    const { useAuthToken } = useAuth();
    const token = useAuthToken();

    return $fetch<T>(url, {
        ...options,
        headers: {
            ...options?.headers,
            Authorization: `Bearer ${token.value}`,
        },
    });
};

export const countPresence = <T>(array: T[]): Map<T, number> =>
    array.reduce((acc, item) => {
        return acc.set(item, (acc.get(item) || 0) + 1);
    }, new Map<T, number>());
