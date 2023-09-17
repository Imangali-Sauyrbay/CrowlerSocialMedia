export const useImageUploader = () => {
    const imageFilesInput = ref<HTMLInputElement>();
    const images = ref<[string, string][]>([]);
    const files = ref<File[]>([]);

    const handleImageUploadClick = () => {
        imageFilesInput.value?.click();
    };

    const handleImageChange = (e: Event) => {
        const target = e.target as HTMLInputElement | null;
        if (!target) return;

        const mergedFiles = getMergedAndValidatedFiles(target, files.value);
        if (imageFilesInput.value) imageFilesInput.value.value = "";
        if (!mergedFiles) {
            return;
        }

        files.value = mergedFiles;
        images.value = readImageAsNameUrlArray(mergedFiles);
    };

    const handleRemoveImage = (name: string) => {
        files.value = files.value.filter((file) => file.name !== name);
        images.value = images.value.filter((image) => {
            if (image[0] !== name) return true;
            revokeObjectUrl(image[1]);
            return false;
        });
    };

    return {
        imageFilesInput,
        images,
        files,
        handleImageUploadClick,
        handleImageChange,
        handleRemoveImage,
    };
};
