<template>
  <div>
    <div class="tw-flex">
      <div class="tw-flex-1 tw-py-1">
        <strong
          v-if="!props.comment.author_is_uploader"
          class="tw-text-base tw-font-semibold"
          >{{ props.comment.author }}</strong
        >
        <strong
          v-else
          class="tw-text-base tw-font-semibold tw-text-yellow-500"
          >{{ props.comment.author }}</strong
        >
        <span class="tw-ml-2 tw-text-xs tw-text-gray-400">{{
          dayjs.unix(props.comment.timestamp).format("YYYY/MM/DD")
        }}</span>
        <p class="tw-text-base">
          {{ props.comment.text }}
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
            {{ props.comment.like_count.toLocaleString() }}
          </p>
        </div>
        <div
          v-if="props.comment.replies"
          class="tw-mt-1 tw-flex tw-items-center tw-text-blue-500"
        >
          <svg
            v-if="showReplies"
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
              d="M5 15l7-7 7 7"
            />
          </svg>
          <svg
            v-else
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
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
          <button
            @click="toggleShowReplies()"
            class="tw-px-2 tw-text-xs tw-tracking-wide tw-capitalize tw-transition-colors tw-duration-200 tw-transformrounded-md focus:tw-outline-none"
          >
            View {{ props.comment.replies.length }} Replies
          </button>
          <!-- <div class="tw-text-sm tw-text-gray-500 tw-font-semibold">
            {{ props.comment.replies.length }} Replies
          </div> -->
        </div>
      </div>
    </div>
    <div v-if="showReplies">
      <div
        class="tw-ml-6"
        v-for="reply in props.comment.replies"
        :id="reply.id"
      >
        <CommentReplyCard :reply="reply" />
      </div>
    </div>
  </div>
</template>

<script setup>
import dayjs from "dayjs/esm";
const props = defineProps({
  comment: {
    type: Object,
    required: true,
  },
});

const showReplies = ref(false);

const toggleShowReplies = () => {
  showReplies.value = !showReplies.value;
};
</script>

<style lang="scss" scoped></style>
