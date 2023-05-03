<template>
  <div class="room bg-dark text-info rounded p-2 d-flex justify-content-between align-items-center">
    <div>
      <span class="text-light">{{ room.name }}</span><i v-if="room.enabled" class="mdi mdi-circle-outline ms-1 "></i>
    </div>
    <router-link :to="{ name: 'Room', params: { roomId: room.id } }">
      <button class="btn btn-info bg-info">enter<i class="mdi mdi-arrow-right"></i></button>
    </router-link>
  </div>
</template>


<script setup>
const props = defineProps({ room: Object })
</script>


<style lang="scss" scoped></style>
