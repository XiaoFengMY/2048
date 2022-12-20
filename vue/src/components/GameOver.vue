<template>
  <div id="gameover">
    <div className="gameover-box">
      <div>
        <h3>{{ message }}</h3>
        <span id="over-score">score:</span>
        <span id="over-score">{{ score }}</span>
      </div>
      <button>again</button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ score: number; message: string }>();
</script>

<style scoped></style>
