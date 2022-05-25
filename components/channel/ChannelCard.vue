<template>
  <NuxtLink
    :to="'/channels/' + props.channel.name"
    class="no-underline tw-text-center"
  >
    <Card class="channel-card text-center dark:tw-bg-eos-grey-950">
      <template #header>
        <img
          class="xl:channel-card-image tw-rounded-t-lg"
          alt="user header"
          :src="$config.cdnURL + props.channel.channel_image_path"
        />
      </template>
      <template #title
        ><div class="tw-text-neutral-700 dark:tw-text-eos-grey-400">
          {{ props.channel.name }}
        </div></template
      >
    </Card>
  </NuxtLink>
</template>

<script setup>
import Card from "primevue/card";

const props = defineProps({
  channel: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.p-card {
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
}
::v-deep(.channel-card) {
  .p-card-title {
    text-decoration: none;
  }
  .p-card-content {
    display: none;
  }
  .p-card {
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
  }
}
</style>
