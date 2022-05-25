<template>
  <div>
    <div
      v-if="props.video.comment_count"
      class="tw-text-xl tw-font-bold tw-mt-2"
    >
      {{ props.video.comment_count.toLocaleString() }} Comments
    </div>
    <div>
      <div v-if="pending">Coments Loading...</div>
      <div v-else>
        <div
          v-for="comment in comments.items"
          :id="comment.id"
          class="tw-flex tw-flex-row tw-items-start tw-justify-start tw-mt-1"
        >
          <CommentCard :comment="comment" />
        </div>
      </div>
    </div>
    <Paginator
      :first="first"
      :rows="paginationLimit"
      :totalRecords="paginationTotalItems"
      @page="onPage($event)"
    ></Paginator>
  </div>
</template>

<script setup>
import Paginator from "primevue/paginator";
const props = defineProps({
  video: {
    type: Object,
  },
});

const config = useRuntimeConfig().public;

// Pagination
const first = ref(0);
const paginationPage = ref(1);
const paginationLimit = ref(10);
const paginationTotalItems = ref(20);

const {
  data: comments,
  pending,
  refresh,
} = await useLazyAsyncData(`video-${props.video.id}-comments`, () =>
  $fetch(
    `${config.apiURL}/comments/${props.video.id}?limit=${paginationLimit.value}&page=${paginationPage.value}`
  )
);

watch(comments, () => {
  paginationTotalItems.value = comments.value.total_items;
});

const onPage = async (event) => {
  paginationPage.value = event.page + 1;
  paginationLimit.value = event.rows;
  refresh();
};
</script>

<style lang="scss" scoped>
.p-paginator {
  background: none;
}
</style>
