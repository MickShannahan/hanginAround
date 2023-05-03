<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-12">Rooms</div>

      <div v-for="r in rooms" class="col-4">
        <Room :room="r" />
      </div>

    </section>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { hms } from '../services/hmsService.js';
import { AppState } from '../AppState.js';
import Peoples from '../components/Peoples.vue';
import MainVideo from '../components/MainVideo.vue';

onMounted(() => {
  hms.getRooms()
})
const rooms = computed(() => AppState.rooms)
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
