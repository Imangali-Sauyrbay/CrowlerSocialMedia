<template>
    <div class="flex h-full">
        <AuthCrowlImage />

        <div
            class="flex flex-col justify-center px-4 py-12 max-[720px]:flex-1 min-[721px]:max-[960px]:basis-2/3 min-[961px]:flex-1 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div class="mx-auto flex h-full w-full max-w-sm items-center lg:w-96">
                <AuthForm />
            </div>
        </div>
    </div>
</template>
