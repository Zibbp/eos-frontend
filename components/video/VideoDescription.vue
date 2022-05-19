<template>
  <div
    class="lg:tw-w-1/2 tw-whitespace-pre-wrap"
    v-html="formattedDescription"
  ></div>
</template>

<script setup>
const props = defineProps({
  description: {
    type: String,
  },
});

const formattedDescription = ref("");

const linkRegex = /([^\S]|^)(((https?\:\/\/)|(www\.))(\S+))/gi;
const timestampRegex = /(?:(?:([01]?\d):)?([0-5]?\d))?:([0-5]?\d)/gi;

const formatLinks = props.description.replace(
  linkRegex,
  "$1<a href='$2' target='_blank' class='tw-text-blue-500'>$2</a>"
);

const formatTimestamps = formatLinks.replace(
  timestampRegex,
  "$1<span class='tw-text-blue-500'>$&</span>"
);

formattedDescription.value = formatTimestamps;
</script>

<style scoped></style>
