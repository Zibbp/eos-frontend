<template>
  <div class="tw-mx-auto tw-min-w-full tw-px-3 tw-pt-3">
    <div class="">
      <p
        class="tw-title-font tw-font-medium tw-text-neutral-900 dark:tw-text-white"
      >
        <span class="tw-text-xl">{{ props.video.title }}</span>
      </p>
    </div>
    <div class="tw-pb-4 tw-flex tw-items-center sm:tw-flex-row tw-flex-col">
      <p
        class="tw-text-sm tw-flex tw-text-neutral-800 sm:tw-py-2 sm:tw-mt-0 tw-mt-1 dark:tw-text-neutral-200"
      >
        <span>
          <img
            class="tw-inline tw-object-cover tw-w-8 tw-h-8 tw-rounded-full tw-mr-2"
            :src="$config.cdnURL + props.channel.channel_image_path"
            :alt="props.video.channel + ' profile image'"
          />
          <NuxtLink
            :to="'/channels/' + props.video.channel"
            class="tw-font-bold"
          >
            {{ props.video.channel }}
          </NuxtLink>
        </span>
        <span class="tw-mt-1 tw-ml-1"
          >• {{ dayjs(props.video.upload_date).format("YYYY/MM/DD") }} •
          {{ props.video.view_count.toLocaleString() }} views</span
        >
        <span
          @click="showStats = !showStats"
          class="tw-ml-1 tw-mt-1 tw-cursor-pointer"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            class="tw-h-5 tw-w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            /></svg
        ></span>
      </p>
      <span
        class="tw-inline-flex sm:tw-ml-auto sm:tw-mt-0 tw-mt-4 tw-justify-center sm:tw-justify-start dark:tw-text-neutral-200"
      >
        <span v-if="props.video.like_count" class="tw-flex">
          <div class="tw-text-neutral-700 dark:tw-text-neutral-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="tw-h-5 tw-w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"
              ></path>
            </svg>
          </div>
          <div class="tw-ml-2 tw-text-neutral-700 dark:tw-text-neutral-200">
            {{ props.video.like_count.toLocaleString() }}
          </div>
        </span>

        <span v-if="props.video.dislike_count" class="tw-flex">
          <div class="tw-ml-3 tw-text-neutral-700 dark:tw-text-neutral-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              class="h-5 w-5"
            >
              <path
                d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"
              ></path>
            </svg>
          </div>
          <div class="tw-ml-2 tw-text-neutral-700 dark:tw-text-neutral-200">
            {{ props.video.dislike_count.toLocaleString() }}
          </div>
        </span>
      </span>
    </div>
    <div v-if="showStats" class="tw-mb-2 tw-text-sm">
      <ul>
        <li>
          <span class="tw-font-bold">Upload Date:</span>
          {{ props.video.upload_date }}
        </li>
        <li>
          <span class="tw-font-bold">Imported On:</span>
          {{ props.video.created_at }}
        </li>
        <li>
          <span class="tw-font-bold">Format:</span> {{ props.video.format }}
        </li>
        <li>
          <span class="tw-font-bold">Resolution:</span>
          {{ props.video.resolution }}
        </li>
        <li><span class="tw-font-bold">FPS:</span> {{ props.video.fps }}</li>
        <li>
          <span class="tw-font-bold">Video Codec:</span>
          {{ props.video.vcodec }}
        </li>
        <li><span class="tw-font-bold">VBR:</span> {{ props.video.vbr }}</li>
        <li>
          <span class="tw-font-bold">Audio Codec:</span>
          {{ props.video.acodec }}
        </li>
        <li><span class="tw-font-bold">ABR:</span> {{ props.video.abr }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import dayjs from "dayjs/esm";

const showStats = ref(false);

const props = defineProps({
  video: {
    type: Object,
    required: true,
  },
  channel: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="scss" scoped></style>
