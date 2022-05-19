<template>
  <div>
    <div v-if="pending"></div>
    <div v-else>
      <div class="tw-w-64" v-for="video in randomVideos">
        <VideoCard class="tw-mb-1" :video="video" />
      </div>
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig().public;

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const {
  data: randomVideos,
  pending,
  refresh,
} = await useLazyAsyncData(`random-videos-${props.id}`, () =>
  $fetch(`${config.apiURL}/videos/random?count=8`)
);
</script>

<style lang="scss" scoped></style>
