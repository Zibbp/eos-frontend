import { defineNuxtPlugin } from "#app";
import PrimeVue from "primevue/config";
import Button from "primevue/button";
import Toast from "primevue/toast";
import ToastService from 'primevue/toastservice';
import Tooltip from 'primevue/tooltip';
import VueLazyLoad from 'vue3-lazyload';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(PrimeVue, { ripple: true });
    nuxtApp.vueApp.use(ToastService);
    nuxtApp.vueApp.component('Button', Button);
    nuxtApp.vueApp.component('Toast', Toast);
    nuxtApp.vueApp.directive('tooltip', Tooltip);
    nuxtApp.vueApp.use(VueLazyLoad);
});