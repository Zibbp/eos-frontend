<template>
  <div>
    <div class="tw-max-w-xs tw-mx-auto tw-overflow-hidden tw-relative">
      <span
        class="tw-px-1 tw-py-1 tw-ml-1 tw-mt-1 tw-bottom-19 tw-right-1 tw-text-xs tw-absolute tw-text-white video-badge tw-rounded-lg"
      >
        {{
          dayjs
            .utc(props.video.duration * 1000)
            .format("HH:mm:ss")
            .replace("00:", "")
        }}
      </span>
      <NuxtLink :to="'/watch/' + props.video.id">
        <a :href="'/watch/' + props.video.id">
          <div>
            <img
              v-show="isImageLoaded"
              @load="imageLoaded"
              class="lg:tw-h-36 tw-w-full tw-rounded-lg"
              :src="
                config.cdnURL + encodeURIComponent(props.video.thumbnail_path)
              "
              :alt="video.title + ' thumbnail'"
            />
            <div v-show="!isImageLoaded" class="lg:tw-h-36 tw-w-full">
              <Skeleton width="100%" height="100%" />
            </div>
          </div>
          <div class="tw-py-1 tw-text-center">
            <p
              :title="props.video.title"
              class="tw-block tw-text-sm tw-font-bold tw-text-gray-800 tw-text-left video-title dark:tw-text-gray-100 tw-line-clamp-2"
              v-tooltip.top="props.video.title"
            >
              {{ props.video.title }}
            </p>

            <div class="">
              <p
                class="tw-text-sm tw-text-gray-700 dark:tw-text-ytd-200 tw-text-left"
              >
                {{ props.video.channel }}
              </p>
              <p
                class="tw-text-sm tw-text-gray-700 dark:tw-text-ytd-200 tw-text-left"
              >
                {{ numFormatter(props.video.view_count) }} views •
                {{ dayjs(props.video.upload_date).format("YYYY/MM/DD") }}
              </p>
            </div>
          </div>
        </a>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import Skeleton from "primevue/skeleton";
import * as dayjs from "dayjs";
import * as utc from "dayjs/plugin/utc";
const config = useRuntimeConfig().public;

dayjs.extend(utc);

const props = defineProps({
  video: {
    type: Object,
    required: true,
  },
});

const numFormatter = (num) => {
  if (num > 999 && num < 1000000) {
    return (num / 1000).toFixed(0) + "K"; // convert to K for number from > 1000 < 1 million
  } else if (num > 1000000) {
    return (num / 1000000).toFixed(1) + "M"; // convert to M for number from > 1 million
  } else if (num < 900) {
    return num; // if value < 1000, nothing to do
  }
};

const isImageLoaded = ref(false);

const imageLoaded = () => {
  isImageLoaded.value = true;
};
</script>

<style lang="scss" scoped>
.thumbnail-height {
  height: 9rem;
  max-height: 9rem;
}
.video-badge {
  background-color: rgba(0, 0, 0, 0.6);
}
[data-placeholder]::after {
  content: " ";
  box-shadow: 0 0 50px 9px rgba(254, 254, 254);
  position: absolute;
  top: 0;
  left: -100%;
  height: 100%;
  animation: load 1s infinite;
}
@keyframes load {
  0% {
    left: -100%;
  }
  100% {
    left: 150%;
  }
}
.video-card-disabled {
  pointer-events: none;
}
</style>
