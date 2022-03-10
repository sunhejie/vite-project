<template>
  <div class="user-wrap wrap">
    <div class="inner">123</div>
  </div>
</template>
<script lang="ts">
export default { name: 'login' }
</script>
<script setup lang="ts"></script>
<style>
.wrap {
  @apply border;
  & .inner {
    @apply w-20 h-20 bg-red-300;
  }
}
</style>
