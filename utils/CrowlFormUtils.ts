export const handleFormSuccess = (crowl: ExcludedCrowl): void => {
    navigateTo({
        path: `/status/${crowl.id}`,
    });
};
