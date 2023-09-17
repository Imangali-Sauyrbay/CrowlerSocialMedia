<script lang="ts" setup>
import { MAX_CROWL_LENGTH } from "~/constants/FORMS";

const props = defineProps<{
    profile: string;
    errors: [string, string][];
    isLoading: boolean;
    isSuccess: boolean;
    placeholder?: string;
    compact?: boolean;
}>();

const emits = defineEmits<{
    (event: "onSubmit", text: string, files: File[]): void;
}>();

const text = ref<string>("");

const {
    imageFilesInput,
    images,
    files,
    handleImageUploadClick,
    handleImageChange,
    handleRemoveImage,
} = useImageUploader();

watch(
    () => props.isSuccess,
    (newValue) => {
        if (newValue) {
            images.value = [];
            files.value = [];
            text.value = "";
        }
    },
);

const handleSubmit = () => {
    emits("onSubmit", text.value, files.value);
};

const disabeleButton = computed(
    () =>
        (text.value.length <= 0 && files.value.length <= 0) || props.isLoading,
);
</script>

<template>
    <div class="h-fit">
        <div
            class="flex w-full flex-shrink-0 items-center p-4 pb-0"
            :class="[compact ? 'h-20' : 'h-28']"
        >
            <div class="flex w-12 items-start self-start pt-2">
                <img
                    :src="profile"
                    alt="Profile Picture"
                    class="inline-block h-10 w-10 rounded-full"
                />
            </div>

            <div class="h-full w-full p-2">
                <textarea
                    v-model="text"
                    :placeholder="placeholder ?? $t('crowls.placeholder')"
                    class="default-scrollbar h-full w-full resize-none border-0 bg-transparent text-lg text-gray-900 placeholder:text-gray-400 focus:ring-0 dark:text-white"
                >
                </textarea>

                <input
                    ref="imageFilesInput"
                    type="file"
                    accept="image/png, image/jpeg, image/webp, image/gif"
                    hidden
                    multiple
                    @change="handleImageChange"
                />
            </div>
        </div>

        <UIImages
            class="py-4 pl-16 pr-5"
            :images="images"
            :closable="true"
            :compact="compact"
            @remove-image="handleRemoveImage"
        />

        <div class="flex items-center p-2 pl-5 md:pl-14">
            <div class="flex items-center">
                <UIIconButton @click="handleImageUploadClick">
                    <IconImageFrame />
                </UIIconButton>

                <UIIconButton>
                    <IconGif />
                </UIIconButton>

                <UIIconButton>
                    <IconChart />
                </UIIconButton>

                <UIIconButton>
                    <IconEmoji />
                </UIIconButton>

                <UIIconButton>
                    <IconCalendar />
                </UIIconButton>
            </div>

            <div class="ml-auto">
                <UITextLengthIndicator
                    :length="text.length"
                    :max-length="MAX_CROWL_LENGTH"
                />

                <UIButton
                    :disabled="disabeleButton"
                    :is-loading="isLoading"
                    class="font-bold"
                    @click="handleSubmit"
                >
                    Crowl
                </UIButton>
            </div>
        </div>
    </div>
</template>
