<template>
  <div class="d-flex justify-content-center">
    <div class="wrapper">
      <video id="large-stream" autoplay muted playsinline></video>
      <div v-if="activePeer" class="profile-name">{{ profile.name }}</div>
    </div>

  </div>
</template>


<script setup>
import { computed, watch } from 'vue';
import { AppState } from '../AppState.js';
import { hms } from '../services/hmsService.js';

const activePeer = computed(() => AppState.activePeer)
const profile = computed(() => JSON.parse(AppState.activePeer.metadata))
watch(activePeer, () => {
  const videoTrack = activePeer.value.videoTrack
  const player = document.getElementById('large-stream')
  hms.loadStream(videoTrack, player)
})
</script>


<style lang="scss" scoped>
.wrapper {
  border-radius: 10px;
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
}
</style>
