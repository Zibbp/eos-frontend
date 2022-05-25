<template>
  <div>
    <div class="tw-bg-blue-500 dark:tw-bg-red-500">DEMO</div>
    <section class="tw-w-full">
      <div
        class="tw-relative tw-items-center tw-w-full tw-px-5 tw-py-12 tw-mx-auto md:tw-px-12 lg:tw-px-16 tw-max-w-7xl lg:tw-py-24"
      >
        <div class="tw-flex tw-w-full tw-mx-auto tw-text-left">
          <div
            class="tw-relative tw-inline-flex tw-items-center tw-mx-auto tw-align-middle"
          >
            <div class="tw-text-center">
              <h1
                class="tw-max-w-5xl tw-text-2xl tw-font-bold tw-leading-none tw-tracking-tighter tw-text-neutral-800 dark:tw-text-white md:tw-text-5xl lg:tw-text-6xl lg:tw-max-w-7xl"
              >
                Watch Your Evergrowing <br class="tw-hidden lg:tw-block" />
                YouTube Archive
              </h1>
              <p
                class="tw-max-w-xl tw-mx-auto tw-mt-8 tw-text-base tw-leading-relaxed tw-text-gray-500"
              >
                Import and browse your locally archived YouTube collection with
                a familiar feel.
              </p>
              <div
                class="tw-flex tw-justify-center tw-w-full tw-max-w-2xl tw-gap-2 tw-mx-auto tw-mt-6"
              >
                <div class="tw-mt-3 tw-rounded-lg sm:tw-mt-0">
                  <NuxtLink to="/channels">
                    <button
                      class="tw-items-center tw-block tw-px-5 tw-py-4 tw-text-base tw-font-medium tw-text-center tw-text-white tw-transition tw-duration-500 tw-ease-in-out tw-transform tw-bg-red-600 lg:tw-px-10 tw-rounded-xl hover:tw-bg-red-700 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-offset-2 focus:tw-ring-red-500"
                    >
                      Channels
                    </button></NuxtLink
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <section id="intro">
          <div
            class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-pt-24 tw-mx-auto tw-rounded-lg lg:tw-px-10 tw-max-w-7xl"
          >
            <img
              class="tw-object-cover tw-object-center tw-w-full tw-rounded-xl"
              alt="hero"
              src="/images/landing.jpg"
            />
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
