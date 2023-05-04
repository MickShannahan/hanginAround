<template>
  <div class="peer" v-if="profile" @click="setActive">
    <img :src="profile.picture" alt="">
    {{ profile.name }} {{ profile.id }}
    <div v-if="isLocal">

      <button class="btn btn-danger" @click.stop="seeScreen()">🥾</button>
      <button class="btn btn-danger" @click.stop="hms.toggleVideo()">✂️</button>
    </div>

  </div>
</template>


<script setup>
import { computed } from 'vue';
import { AppState } from '../AppState.js';
import { hms } from '../services/hmsService.js';

const props = defineProps({ peer: Object, num: Number })
const profile = computed(() => props.peer.metadata ? JSON.parse(props.peer?.metadata) : null)

const isLocal = computed(() => props.peer.isLocal)

function setActive() {
  AppState.activePeer = props.peer
}

function seeScreen() {
  let videoElm = document.getElementById('large-stream')
  hms.screenShare(props.peer.id, videoElm)
}
</script>


<style lang="scss" scoped>
.peer {
  img {
    height: 100px;
    width: 100px;
  }
}
</style>
