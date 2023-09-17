<script lang="ts" setup>
type InputType = "text" | "email" | "password";

const props = withDefaults(
    defineProps<{
        placeholder?: string;
        label?: string;
        type?: InputType;
        errors?: [string, string][];
        field?: string;
        required?: boolean;
    }>(),
    {
        required: true,
        type: "text",
        placeholder: "",
        label: "",
        errors: [] as [string, string][],
        field: "",
    },
);

const errorsFiltered = computed(() => {
    const errors: string[] = [];

    if (!props.errors) return errors;

    props.errors.forEach(([key, value]) => {
        if (key === props.field) errors.push(value);
    });

    return errors;
});

const { modelValue } = defineModels<{ modelValue?: string }>();

const id = `input_${Date.now()}_${Math.random()
    .toString(36)
    .substring(2, 8)
    .toUpperCase()}`;
</script>

<template>
    <div class="w-full">
        <div class="flex items-center">
            <label
                v-if="label"
                :for="id"
                class="ml-px block cursor-pointer pl-3 text-sm font-medium text-gray-700 dark:text-gray-300"
                >{{ label }}</label
            >
            <span v-if="required" class="ml-1 text-red-600">*</span>
            <span v-else class="ml-2 text-xs text-gray-500"
                >({{ $t("form.optional") }})</span
            >
        </div>
        <div class="mt-1 w-full">
            <input
                :id="id"
                v-model="modelValue"
                class="block w-full rounded-full px-4 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                :type="type || 'text'"
                :placeholder="placeholder"
                :autocomplete="label"
                :class="[
                    errorsFiltered.length
                        ? 'border-red-600'
                        : 'border-gray-400',
                ]"
                v-bind="$attrs"
            />

            <UIErrorList :errors="errorsFiltered" />
        </div>
    </div>
</template>
