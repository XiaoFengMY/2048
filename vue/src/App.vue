<script setup lang="ts">
import { ref } from "vue";
import Header from "./components/Header.vue";

const data = ref([
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 2, 0],
  [0, 0, 0, 0],
]);
const generateClassName = (a: any, b: any) => {
  return `grid-cell-${a}-${b}`;
};

const generateIdName = (item: any) => {
  return `grid-cell grid-cell-item-${item}`;
};
</script>

<template>
  <Header :score="0" />
  <div id="grid-container">
    <div v-for="(row, indexR) in data">
      <div
        v-for="(col, indexC) in row"
        :id="generateClassName(indexR, indexC)"
        :class="generateIdName(col)"
      >
        <span v-if="col != 0">{{ col }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
