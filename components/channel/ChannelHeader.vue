<template>
  <div class="-tw-mt-1 tw-bg-eos-grey-200">
    <div class="tw-container tw-mx-auto">
      <div class="tw-flex tw-justify-between tw-items-center tw-py-4 tw-px-16">
        <div class="tw-flex tw-items-center">
          <div class="tw-w-24 tw-h-24 tw-rounded-full tw-relative">
            <img
              class="tw-rounded-full"
              :src="$config.cdnURL + props.channel.channel_image_path"
              alt=""
            />
          </div>
          <div class="tw-ml-6">
            <div
              class="tw-text-2xl tw-font-normal tw-flex tw-items-center dark:tw-text-gray-100"
            >
              <span class="mr-2">{{ props.channel.name }}</span>
            </div>
            <p class="tw-mt-2 tw-font-hairline tw-text-sm dark:tw-text-ytd-200">
              {{ channelVideoCount.toLocaleString() }} videos
            </p>
          </div>
        </div>
      </div>
      <div class="tw-px-16">
        <ul class="tw-list-reset tw-flex">
          <li
            class="tw-text-center tw-py-3 tw-px-8 tw-border-b-2 tw-border-solid tw-border-grey-dark"
          >
            <a href="#" c> Videos </a>
          </li>
          <li class="tw-text-center tw-py-3 tw-px-8">
            <a href="#" class="hover:tw-text-black"> Playlists </a>
          </li>
          <li class="tw-text-center tw-py-3 ptw-x-8">
            <a href="#" class="hover:tw-text-black"> Community </a>
          </li>
          <li class="tw-text-center tw-py-3 tw-px-8">
            <a href="#" class="hover:tw-text-black"> Channels </a>
          </li>
          <li class="tw-text-center tw-py-3 tw-px-8">
            <a href="#" class="hover:tw-text-black"> About </a>
          </li>
          <li class="tw-text-center tw-py-3 tw-px-8">
            <i class="fa fa-search fa-lg text-grey-dark"></i>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  channel: {
    type: Object,
  },
  channelVideoCount: {
    type: Number,
  },
});
</script>

<style lang="scss" scoped></style>
