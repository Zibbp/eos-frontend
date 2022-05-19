<template>
  <div class="eos-player">
    <video id="player" playsinline controls crossorigin="">
      <!-- <source
          src="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          type="video/mp4"
        /> -->
    </video>
  </div>
</template>

<script setup>
const config = useRuntimeConfig().public;

const props = defineProps({
  video: {
    type: Object,
    required: true,
  },
});

const playerOptions = {
  controls: [
    "rewind",
    "play-large",
    "play",
    "fast-forward",
    "progress",
    "current-time",
    "mute",
    "volume",
    "captions",
    "settings",
    "download",
    "pip",
    "airplay",
    "fullscreen",
  ],
  settings: ["captions", "quality", "speed", "loop"],
  autoplay: false,
  keyboard: { focused: true, global: false },
  speed: { selected: 1, options: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2] },
  markers: {},
};

const playerSources = {
  type: "video",
  title: "Eos",
  sources: [],
  poster: "",
  tracks: [],
};

onMounted(async () => {
  const Plyr = await import("plyr");

  if (props.video.chapters) {
    const markers = {
      enabled: true,
      points: [],
    };
    for await (const chapter of props.video.chapters) {
      markers.points.push({
        time: chapter.start_time,
        label: chapter.title,
      });
      playerOptions.markers = markers;
    }
  }

  const newPlayer = new Plyr.default("#player", playerOptions);

  // Push player items
  playerSources.title = props.video.title;

  playerSources.sources.push({
    src: `${config.cdnURL}/${encodeURIComponent(props.video.video_path)}`,
    type: "video/webm",
  });

  if (props.video.subtitle_path) {
    playerSources.tracks.push({
      kind: "captions",
      src: `${config.cdnURL}/${encodeURIComponent(props.video.subtitle_path)}`,
      label: "English",
      srclang: "en",
      default: true,
    });
  }

  playerSources.poster = `${config.cdnURL}/${encodeURIComponent(
    props.video.thumbnail_path
  )}`;

  // Set sources
  newPlayer.source = playerSources;
});
</script>

<style>
.eos-player .plyr {
  width: 100% !important;
  height: calc(100vh - 11rem) !important;
  max-height: calc(100vh - 11rem) !important;
  --plyr-color-main: #ff0000;
}
</style>
