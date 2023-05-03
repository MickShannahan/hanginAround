<template>
  <div class="container-fluid">
    <section v-if="room" class="row">
      {{ room.name }}
    </section>

    <section class="row">

      <div v-for="p in peers" class="col-2">
        <Peoples :peer="p" />
      </div>

    </section>
    <section class="row video-player">
      <MainVideo></MainVideo>
    </section>
  </div>
</template>


<script setup>
import { computed, onBeforeUnmount, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { hms } from '../services/hmsService.js';
import { useRoute } from 'vue-router';
import Peoples from '../components/Peoples.vue';

const room = computed(() => AppState.activeRoom)
const peers = computed(() => AppState.peers)
const route = useRoute()
onMounted(() => {
  hms.getOneRoom(route.params.roomId)
  hms.joinRoom(route.params.roomId, AppState.user)
})
onBeforeUnmount(() => {
  hms.leaveRoom()
})
</script>


<style lang="scss" scoped>
.video-player {
  max-height: 50vh;
}
</style>
