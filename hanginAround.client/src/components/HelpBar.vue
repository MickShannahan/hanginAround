<template>
  <div class=" help-bar">
    <section class="instructors-wrapper">
      <div class="instructors">
        <instructor v-for="i in instructors" :instructor="i" />
      </div>
    </section>
    <div class="help-text text-end p-2 pe-4">have a question?</div>
    <section class="help-btn-wrapper text-end">
      <button class="help-btn selectable btn px-4 align-content-start" :class="{ inQueue }" @click="enterQueue">
        <div v-if="!inQueue"> Help <i class="mdi mdi-hand-back-right-outline"></i>
        </div>
        <div v-else>
          <div><i class="mdi mdi-hand-back-right me-2"></i>0:0{{ waitTimer }}</div>
          <div>getting help</div>
          <button @click.stop="exitQueue" class="btn bg-transparent"> cancel<i class="mdi mdi-close"></i></button>
        </div>
      </button>
    </section>
  </div>
</template>


<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { AppState } from '../AppState.js';
import { socketService } from '../services/SocketService';
import Pop from '../utils/Pop.js';

onMounted(() => {
  joinRoom()
})

onUnmounted(() => {
  leaveRoom()
})

function enterQueue() {
  inQueue.value = true
  setTimeout(exitQueue, 15000)
  waitInt.value = setInterval(timer, 1000)
  waitTimer.value = 1
}

async function exitQueue() {
  if (await Pop.confirm("are you sure you want to leave the queue?")) {
    inQueue.value = false
    waitInt.value = clearInterval(waitInt.value)
    waitTimer.value = 1
  }
}

function timer() {
  waitTimer.value++
}

function joinRoom() {
  socketService.joinRoom('HELP_TABLE')
}

function leaveRoom() {
  socketService.leaveRoom('HELP_TABLE')
}

const inQueue = ref(false)
const waitInt = ref(null)
const waitTimer = ref(1)
const instructors = computed(() => AppState.helpInstructors)
</script>


<style lang="scss" scoped>
.help-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--bs-dark);
  min-height: 2vh;
  display: grid;
  grid-template-columns: 1fr 20ch 20ch;
  grid-template-rows: 1fr;
}

.instructors-wrapper {
  grid-column: 1 / span 1;
  position: relative;

  .instructors {
    position: absolute;
    display: flex;
    padding: 1em;
    gap: .5em;
    top: -55px;
  }
}

.help-btn-wrapper {
  position: relative;
  grid-column: 3 /span 1;

  .help-btn {
    transition: all ease .2s;
    position: absolute;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 110%;
    background-color: var(--bs-dark);
    border-top: 1px solid var(--bs-info);
    border-left: 1px solid var(--bs-info);
    border-right: 1px solid var(--bs-info);
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 0px;
    border-bottom-left-radius: 0px;
    color: var(--bs-info);

    &:hover {
      height: 140%;
    }
  }

  .inQueue {
    background-color: var(--bs-info);
    color: var(--bs-dark);
    height: 250%;

    &:hover {
      height: 250%;

    }
  }
}
</style>
