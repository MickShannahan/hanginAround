<template>
  <div class="instructor">
    <img :src="instructor.picture" :alt="instructor.name" :title="instructor.name">
  </div>
</template>


<script setup>
const props = defineProps({ instructor: Object })
</script>


<style lang="scss" scoped>
.instructor {
  width: 75px;
  height: 75px;
  border-radius: 50em;
  overflow: hidden;
  opacity: 0;
  animation: bounce-in .3s .2s ease forwards;

  img {
    width: 100%;
    aspect-ratio: 1/1;
    object-fit: cover;
    object-position: center;
  }
}

@keyframes bounce-in {
  0% {
    transform: translateY(40px);
    opacity: 0;
  }

  100% {
    transform: translateY(0px);
    opacity: 1;
  }
}
</style>
