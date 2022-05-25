<template>
  <div>
    <div class="tw-flex">
      <div class="tw-flex-1 tw-py-1">
        <strong class="tw-text-base tw-font-semibold">{{
          props.reply.author
        }}</strong>

        <span class="tw-ml-2 tw-text-xs tw-text-gray-400">{{
          dayjs.unix(props.reply.timestamp).format("YYYY/MM/DD")
        }}</span>
        <p class="tw-text-base">
          {{ props.reply.text }}
        </p>
        <div
          class="tw-mt-1 tw-flex tw-text-gray-500 dartw-k:text-true-gray-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="tw-h-4 tw-w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
            />
          </svg>
          <p class="tw-text-sm tw-ml-1 dark:tw-text-true-gray-400">
            {{ props.reply.like_count.toLocaleString() }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import dayjs from "dayjs/esm";
const props = defineProps({
  reply: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="scss" scoped></style>
