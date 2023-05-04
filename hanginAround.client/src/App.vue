<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import { hms } from './services/hmsService.js'

export default {
  setup() {
    function closeDown(event) {
      event.preventDefault()
      hms.leaveRoom()
      return event.returnValue = "are you sure? this will end the call";
    }
    onMounted(() => {
      window.addEventListener('beforeunload', closeDown, { capture: true })
      window.addEventListener('unload', closeDown, { capture: true })
    })
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>
