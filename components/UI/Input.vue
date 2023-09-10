<script lang="ts" setup>
type InputType = 'text' | 'email' | 'password';

const props = withDefaults(
    defineProps<{
        placeholder?: string,
        label?: string,
        type?: InputType,
        errors?: ([string, string])[],
        field?: string,
        required?: boolean
    }>(),
    {
        required: true,
        type: 'text'
    }
)

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
        <div class="flex items-center">
            <label :for="id" v-if="label" class="block pl-3 ml-px text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">{{ label }}</label>
            <span class="ml-1 text-red-600" v-if="required">*</span>
            <span class="ml-2 text-gray-500 text-xs" v-else>({{ $t('form.optional') }})</span>
        </div>
        <div class="mt-1 w-full">
            <input
                class="block px-4 w-full rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                :id="id"
                :type="type || 'text'"
                :placeholder="placeholder"
                :autocomplete="label"
                :class="[errorsFiltered.length ? 'border-red-600' : 'border-gray-400']"
                
                v-model="modelValue"
                v-bind="$attrs"
            />

            <UIErrorList :errors="errorsFiltered"/>
        </div>
    </div>
</template>