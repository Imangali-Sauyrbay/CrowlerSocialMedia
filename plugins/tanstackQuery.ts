import { VueQueryPlugin, VueQueryPluginOptions } from "@tanstack/vue-query";

const vueQueryPluginOptions: VueQueryPluginOptions = {
    queryClientConfig: {
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
            },
        },
    },
};

export default defineNuxtPlugin(({ vueApp }) => {
    vueApp.use(VueQueryPlugin, vueQueryPluginOptions);
});
