<template>
  <div class="tw-bg-eos-grey-100 tw-min-h-screen">
    <div class="tw-container tw-mx-auto tw-drop-shadow">
      <Menubar :model="items" class="eos-menubar">
        <template #start>
          <img
            alt="logo"
            src="/images/eos-logo.svg"
            height="40"
            class="tw-ml-2"
          />
        </template>
        <template #end>
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText
              placeholder="Search"
              type="text"
              v-model="searchQuery"
              v-on:keyup.enter="search"
            />
          </span>
          <Button
            v-if="videoStore.displayRandomVideos"
            v-tooltip.bottom="'Hide Random Videos'"
            icon="pi pi-angle-double-left"
            class="p-button-rounded p-button-secondary p-button-text"
            @click="toggleRandomVideos()"
          />
          <Button
            v-if="!videoStore.displayRandomVideos"
            v-tooltip.bottom="'Show Random Videos'"
            icon="pi pi-angle-double-right"
            class="p-button-rounded p-button-secondary p-button-text"
            @click="toggleRandomVideos()"
          />

          <Button
            v-if="colorMode.preference == 'dark'"
            @click="colorMode.preference = 'light'"
            v-tooltip.bottom="'Switch to Light Mode'"
            icon="pi pi-moon"
            class="p-button-text p-button-rounded p-button-secondary"
          />
          <Button
            v-if="colorMode.preference == 'light'"
            @click="colorMode.preference = 'system'"
            v-tooltip.bottom="'Switch to System Mode'"
            icon="pi pi-sun"
            class="p-button-text p-button-rounded p-button-secondary"
          />
          <Button
            v-if="$colorMode.preference == 'system'"
            @click="$colorMode.preference = 'dark'"
            v-tooltip.bottom="'Switch to Dark Mode'"
            icon="pi pi-desktop"
            class="p-button-text p-button-rounded p-button-secondary"
          />
        </template>
      </Menubar>
    </div>
    <slot />
  </div>
</template>

<script setup>
import { useVideoStore } from "~/store/videos";
import Menubar from "primevue/menubar";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
const colorMode = useColorMode();

const videoStore = useVideoStore();

const toggleRandomVideos = () => {
  videoStore.displayRandomVideos = !videoStore.displayRandomVideos;
};

const items = ref([
  {
    label: "Home",
    to: "/",
  },
  {
    label: "Channels",
    to: "/channels",
  },
]);

const searchQuery = ref("");

const search = async () => {
  if (searchQuery != "") {
    await navigateTo({
      path: "/search",
      query: {
        q: searchQuery.value,
      },
    });
    searchQuery.value = "";
  }
};
</script>

<style lang="scss" scoped>
.p-menubar {
  border: none;
}
::v-deep(.eos-menubar) {
  .p-menubar-start img {
    height: 40px;
  }
  .p-menuitem-link {
    padding: 0.75rem 0.5rem !important;
  }
}
</style>
