<template>
  <div class="component">
    {{ students }}
  </div>
</template>


<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { socketService } from '../services/SocketService'

onMounted(() => {
  joinRoom()
})

function joinRoom() {
  socketService.joinRoom('HELP_TABLE')
}
const students = computed(() => AppState.students)
</script>


<style lang="scss" scoped></style>
