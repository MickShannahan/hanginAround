<template>
  <div class="d-flex justify-content-center">
    <div class="wrapper">
      <video id="large-stream" :class="{ blur: !loaded }" autoplay muted playsinline></video>
      <div v-if="activePeer" class="profile-name">{{ profile.name }}</div>
    </div>

  </div>
</template>


<script setup>
import { computed, watch, ref } from 'vue';
import { AppState } from '../AppState.js';
import { hms } from '../services/hmsService.js';
import { logger } from '../utils/Logger.js';

const loaded = ref(false)

const activePeer = computed(() => AppState.activePeer)
const profile = computed(() => JSON.parse(AppState.activePeer.metadata))
watch(activePeer, () => {
  logger.log('🦧 swapping peer')
  loaded.value = false
  const videoTrack = activePeer.value.videoTrack
  logger.log('🦧', videoTrack)
  const player = document.getElementById('large-stream')
  hms.loadStream(videoTrack, player)
  setTimeout(() => {
    loaded.value = true
  }, 200)
})
</script>


<style lang="scss" scoped>
.wrapper {
  border-radius: 25px;
  position: relative;
  overflow: hidden;

  .profile-name {
    position: absolute;
    margin: 0;
    bottom: 1em;
    width: 100%;
    text-align: center;
    color: white;
    text-shadow: 0px 0px 4px black;
  }
}

video {
  height: 45vh;
  transform: scale(-1.05, 1.05);
  background-color: rgb(15, 9, 24);

  &.blur {
    transition: all .2s .2s ease;
    filter: blur(20px);
  }
}
</style>
