<template>
  <div>
    <div class="tw-mt-1">
      <ChannelHeader
        :channel="channel"
        :channelVideoCount="paginationTotalItems"
      />
    </div>
    <div class="tw-container tw-mx-auto">
      <div v-if="pending" class="tw-flex tw-flex-wrap -tw-mx-1 lg:-tw-mx-4">
        <!-- Skeleton cards while API loads -->
        <div
          v-for="(n, index) in paginationLimit"
          class="tw-my-1 tw-w-full md:tw-w-1/2 lg:tw-my-4 lg:tw-px-2 lg:tw-w-1/4 xl:tw-w-1/6"
        >
          <VideoLoadingCard />
        </div>
      </div>
      <div v-else class="tw-flex tw-flex-wrap -tw-mx-1 lg:-tw-mx-4">
        <div
          v-for="video in videos.items"
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
  </div>
</template>

<script setup>
import ProgressSpinner from "primevue/progressspinner";
import Paginator from "primevue/paginator";

const route = useRoute();
const config = useRuntimeConfig().public;

// Pagination
const first = ref(0);
const paginationPage = ref(1);
const paginationLimit = ref(20);
const paginationTotalItems = ref(20);

const { data: channel } = await useFetch(
  `${config.apiURL}/channels/name/${route.params.name}`
);

const {
  data: videos,
  pending,
  refresh,
} = await useLazyAsyncData(`videos-${channel.value.id}`, () =>
  $fetch(
    `${config.apiURL}/videos/channel/${channel.value.id}?limit=${paginationLimit.value}&page=${paginationPage.value}`
  )
);

onMounted(() => {
  refresh();
});

// When videos are loaded, set the pagination total items
watch(videos, () => {
  paginationTotalItems.value = videos.value.total_items;
});

const onPage = async (event) => {
  paginationPage.value = event.page + 1;
  paginationLimit.value = event.rows;
  refresh();
  window.scrollTo(0, 0);
};
</script>

<style lang="scss" scoped></style>
