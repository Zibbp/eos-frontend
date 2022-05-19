<template>
  <div class="tw-container tw-mx-auto">
    <div v-if="pending" class="tw-text-center">
      <ProgressSpinner
        style="width: 100px; height: 100px"
        strokeWidth="8"
        fill="var(--surface-ground)"
        animationDuration=".5s"
      />
    </div>

    <div v-else>
      <div class="tw-flex tw-flex-wrap -tw-mx-1 lg:-tw-mx-4">
        <div
          v-for="channel in channels"
          :key="channel.id"
          class="tw-my-1 tw-px-1 tw-w-full md:tw-w-1/2 lg:tw-my-4 lg:tw-px-4 lg:tw-w-1/4 xl:tw-w-1/6"
        >
          <ChannelCard :channel="channel" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ProgressSpinner from "primevue/progressspinner";

const config = useRuntimeConfig().public;

const { pending, data: channels } = useLazyFetch(`${config.apiURL}/channels`);
</script>

<style lang="scss" scoped></style>
