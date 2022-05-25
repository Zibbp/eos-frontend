<template>
  <div class="tw-container tw-mx-auto">
    <div class="tw-mx-auto tw-content-center tw-w-96 tw-mt-4">
      <span class="p-input-icon-left">
        <i class="pi pi-search" />
        <InputText
          type="text"
          v-model="searchQuery"
          v-on:keyup.enter="search"
          placeholder="Search"
        />
      </span>
    </div>

    <div class="tw-flex tw-flex-wrap -tw-mx-1 lg:-tw-mx-4">
      <div
        v-for="video in data.items"
        class="tw-my-1 tw-w-full md:tw-w-1/2 lg:tw-my-4 lg:tw-px-2 lg:tw-w-1/4 xl:tw-w-1/6"
      >
        <VideoCard :video="video" />
      </div>
    </div>
    <Paginator
      :first="first"
      :rows="paginationLimit"
      :totalRecords="paginationTotalItems"
      :rowsPerPageOptions="[20, 50, 100]"
      @page="onPage($event)"
    ></Paginator>
  </div>
</template>

<script setup>
import Paginator from "primevue/paginator";
import InputText from "primevue/inputtext";

const route = useRoute();
const config = useRuntimeConfig().public;

const searchQuery = ref("");
const first = ref(0);
const paginationPage = ref(1);
const paginationLimit = ref(20);
const paginationTotalItems = ref(20);

searchQuery.value = route.query.q;

// API Search
const { data, refresh } = await useAsyncData(
  `search-${searchQuery.value}`,
  () =>
    $fetch(
      `${config.apiURL}/videos/search?query=${searchQuery.value}&limit=${paginationLimit.value}&page=${paginationPage.value}`
    )
);

paginationTotalItems.value = data.value.total_items;

const onPage = async (event) => {
  paginationPage.value = event.page + 1;
  paginationLimit.value = event.rows;
  refresh();
  window.scrollTo(0, 0);
};

const search = async () => {
  await navigateTo({
    path: "/search",
    query: {
      q: searchQuery.value,
    },
  });
  refresh();
};
</script>

<style lang="scss" scoped>
.p-inputtext {
  width: 25rem;
}
.p-paginator {
  background: none;
}
</style>
