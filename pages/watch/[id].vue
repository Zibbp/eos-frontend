<template>
  <div
    class="2xl:tw-max-w-[90%] xl:tw-max-w-[90%] lg:tw-max-w-[90%] md:tw-container sm:tw-container tw-mx-auto tw-mt-2"
  >
    <div class="tw-grid tw-grid-cols-12 tw-gap-1">
      <div
        :class="[
          videoStore.displayRandomVideos
            ? 'tw-col-span-10 2xl:tw-col-span-10 xl:tw-col-span-10 lg:tw-col-span-12 md:tw-col-span-12 sm:tw-col-span-12'
            : 'tw-col-span-12 2xl:tw-col-span-12 xl:tw-col-span-12 lg:tw-col-span-12 md:tw-col-span-12 sm:tw-col-span-12',
        ]"
      >
        <VideoPlayer :video="video.video" />
        <VideoHeader :video="video.video" :channel="video.channel" />
        <VideoDescription :description="video.video.description" />
        <VideoComments
          v-if="video.video.comment_count > 1"
          :video="video.video"
        />
      </div>
      <div
        v-if="videoStore.displayRandomVideos"
        class="tw-mx-auto tw-h-fit tw-col-span-2 2xl:tw-col-span-2 xl:tw-col-span-2 lg:tw-col-span-12 md:tw-col-span-12 sm:tw-col-span-12"
      >
        <VideoRandomVideos :id="video.video.id" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useVideoStore } from "~/store/videos";

// https://github.com/nuxt/framework/discussions/4212#discussioncomment-2533931
// onMounted hook doesn't get called - workaround is to use mounted hook
definePageMeta({
  pageTransition: {
    mode: "default",
    appear: true,
  },
});

const videoStore = useVideoStore();

const config = useRuntimeConfig().public;
const route = useRoute();

onMounted(() => {
  window.scrollTo(0, 0);
});

const { data: video } = await useFetch(
  `${config.apiURL}/videos/${route.params.id}`
);
</script>

<style lang="scss" scoped></style>
