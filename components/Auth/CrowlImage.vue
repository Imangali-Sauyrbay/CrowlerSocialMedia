<script setup lang="ts">
const showImage = ref(false);
const sharinganSFXLoaded = ref(false);
const sharinganActivated = ref(false);

let sharinganAudio: HTMLAudioElement;
let isScreenWideEnough = false;

if (process.client)
    isScreenWideEnough = document.documentElement.clientWidth >= 720;

if (process.client && isScreenWideEnough) {
    sharinganAudio = new Audio("/assets/sounds/sharingan-sfx.mp3");

    const canPlay = () => {
        sharinganSFXLoaded.value = true;
        sharinganAudio.removeEventListener("canplaythrough", canPlay);
    };

    sharinganAudio.addEventListener("canplaythrough", canPlay);
}

const onImageLoaded = () => {
    showImage.value = true;
};

const stopWatchPlaySound = watch(
    [showImage, sharinganSFXLoaded],
    ([imageLoaded, soundLoaded]) => {
        if (
            imageLoaded &&
            soundLoaded &&
            process.client &&
            isScreenWideEnough
        ) {
            sharinganAudio.volume = 0.05;

            setTimeout(() => {
                sharinganAudio.play().catch(() => {
                    /* Swallow any error */
                });
                sharinganActivated.value = true;
            }, 200);

            stopWatchPlaySound();
        }
    },
);

const mounted = ref(false);
onMounted(() => {
    if (process.client) mounted.value = true;
});
</script>

<template>
    <div
        class="relative hidden bg-gray-300 transition duration-1000 dark:bg-dim-800 max-[720px]:flex-1 min-[721px]:block min-[721px]:max-[960px]:basis-1/3 min-[961px]:flex-1"
        :style="{
            filter: showImage ? 'blur(0px)' : 'blur(6px)',
        }"
    >
        <img
            v-if="mounted"
            src="/assets/images/auth/auth-logo.jpg"
            alt="Crow with mangekyou sharingan"
            class="crow-image absolute inset-0 h-full w-full select-none object-cover transition duration-300 ease-in-out"
            :style="{
                opacity: +showImage,
                transform: `scale(${+showImage})`,
            }"
            @load="onImageLoaded"
        />

        <div
            class="overlay transition duration-500 ease-in-out"
            :class="{ sharinganActivated }"
        ></div>
    </div>
</template>

<style scoped>
.overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;

    z-index: 50;
}

.sharinganActivated {
    animation: spin 4s linear 2s infinite;
    box-shadow:
        0 0 50px 30px rgba(175, 0, 0, 0.5) inset,
        0 0 40px 20px rgba(100, 0, 0, 0.2);
}

@keyframes spin {
    0% {
        box-shadow:
            0 0 50px 30px rgba(175, 0, 0, 0.5) inset,
            0 0 20px 30px rgba(100, 0, 0, 0.2);
    }

    25% {
        box-shadow:
            -10px 0 40px 30px rgba(175, 0, 0, 0.7) inset,
            0 0 20px 30px rgba(100, 0, 0, 0.2);
    }

    50% {
        box-shadow:
            0 0 30px 30px rgba(175, 0, 0, 0.5) inset,
            0 0 40px 25px rgba(100, 0, 0, 0.2);
    }

    75% {
        box-shadow:
            10px 0 70px 30px rgba(175, 0, 0, 0.7) inset,
            0 0 50px 30px rgba(100, 0, 0, 0.5);
    }

    100% {
        box-shadow:
            0 0 50px 30px rgba(175, 0, 0, 0.5) inset,
            0 0 20px 30px rgba(100, 0, 0, 0.2);
    }
}
</style>
