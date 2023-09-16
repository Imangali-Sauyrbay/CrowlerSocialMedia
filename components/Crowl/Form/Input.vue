<script lang="ts" setup>
import { MAX_CROWL_LENGTH } from '~/constants/FORMS'

const props = defineProps<{
    profile: string
    errors: [string, string][]
    isLoading: boolean,
    isSuccess: boolean
}>()

const emits = defineEmits<{
    (event: 'onSubmit', text: string, files: File[]): void
}>()

const text = ref<string>('')

const {
    imageFilesInput,
    images,
    files,
    handleImageUploadClick,
    handleImageChange,
    handleRemoveImage
} = useImageUploader()

watch(() => props.isSuccess, (newValue) => {
    if(newValue) {
        images.value = [],
        files.value = [],
        text.value = ''
    }
})

const handleSubmit = () => {
    emits('onSubmit', text.value, files.value)
}

const disabeleButton = computed(() => (text.value.length <= 0 && files.value.length <= 0) || props.isLoading)
</script>

<template>
    <div class="h-fit">
        <div class="flex w-full items-center flex-shrink-0 p-4 pb-0 h-28">
            <div class="flex w-12 items-start self-start pt-2">
                <img :src="profile" alt="Profile Picture" class="inline-block w-10 h-10 rounded-full">
            </div>

            <div class="w-full p-2 h-full" >
                <textarea
                    v-model="text"
                    :placeholder="$t('crowls.placeholder')"
                    class="default-scrollbar w-full h-full text-lg text-gray-900 placeholder:text-gray-400 bg-transparent border-0 dark:text-white focus:ring-0 resize-none">
                </textarea>
                
                <input
                    type="file"
                    ref="imageFilesInput"
                    accept="image/png, image/jpeg, image/webp, image/gif"
                    @change="handleImageChange"
                    hidden
                    multiple
                >
            </div>
        </div>

        <UIImages
            class="py-4 pl-16 pr-5 "
            :images="images"
            :closable="true"
            @removeImage="handleRemoveImage"
        />

        <div class="flex p-2 pl-5 md:pl-14 items-center">
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
                    <IconCalendar/>
                </UIIconButton>
            </div>

            
            <div class="ml-auto">
                <UITextLengthIndicator
                    :length="text.length"
                    :max-length="MAX_CROWL_LENGTH"
                />

                <UIButton
                    @click="handleSubmit"
                    :disabled="disabeleButton"
                    :isLoading="isLoading"
                    class="font-bold"
                >
                    Crowl
                </UIButton>
            </div>
        </div>
    </div>
</template>