<template>
  <div>
    <div class="tw-max-w-xs tw-mx-auto tw-overflow-hidden tw-relative">
      <div>
        <div class="lg:tw-h-36 tw-w-full">
          <Skeleton width="100%" height="100%" />
        </div>
      </div>
      <div class="tw-py-1 tw-text-center">
        <div class="">
          <p class="tw-line-clamp-2">
            <Skeleton width="100%" height="2rem" />
          </p>
          <p class="tw-pt-1">
            <Skeleton width="35%" height="1.25rem" />
          </p>
          <p class="tw-pt-1">
            <Skeleton width="65%" height="1.25rem" />
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Skeleton from "primevue/skeleton";
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
