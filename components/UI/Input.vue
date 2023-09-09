<script lang="ts" setup>
type InputType = 'text' | 'email' | 'password';

const props = defineProps<{
    placeholder?: string,
    label?: string,
    type?: InputType,
    errors?: ([string, string])[],
    field?: string
}>()

const errorsFiltered = computed(() => {
    const errors: string[] = []

    if(! props.errors) return errors

    props.errors.forEach(([key, value]) => {
        if(key === props.field)
            errors.push(value)
    })

    return errors
})

const { modelValue } = defineModels<{ modelValue?: string }>()

const id = `input_${Date.now()}_${Math.random().toString(36).substring(2, 8).toUpperCase()}`
</script>

<template>
    <div class="w-full">
        <label :for="id" v-if="label" class="block pl-3 ml-px text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">{{ label }}</label>
        <div class="mt-1 w-full">
            <input
                :id="id"
                :type="type || 'text'"
                :placeholder="placeholder"
                class="block px-4 w-full rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                :class="[errorsFiltered.length ? 'border-red-600' : 'border-gray-400']"
                v-model="modelValue"
                v-bind="$attrs"
            />

            <UIErrorList :errors="errorsFiltered"/>
        </div>
    </div>
</template>