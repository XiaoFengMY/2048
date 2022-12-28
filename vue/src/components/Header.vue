<script setup lang="ts">

defineProps<{ score: number }>();

</script>

<template>
  <div id="header">
    <h1 className="title">2048</h1>
    <h3 className="author">Created by XiaoFeng</h3>
    <div className="wrapper">
      <div className="score-wrapper">
        <span id="txt">score:</span>
        <span id="score">{{ score }}</span>
      </div>
      <div className="newgame-wrapper">
        <button @click="$emit('re-start')" id="new-game">New Game</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
#header {
  width: 100%;
  margin: 0 auto;
  text-align: center;
}

#header .title {
  font: bold 50px Arial;
  color: rgb(145, 238, 184);
  margin: 0 auto;
}

#header .author {
  font: normal 18px Arial;
  margin: 10px auto;
  padding-left: 20%;
}

#header .wrapper {
  display: flex;
  justify-content: space-between;
  width: 500px;
  margin: 0 auto;
}

#header .score-wrapper {
  width: 100px;
  background-color: azure;
  padding: 6px;
  border-radius: 6px;
}

#header .score-wrapper #txt {
  color: bisque;
}

#header .score-wrapper #score {
  color: crimson;
  font-size: 30px;
  vertical-align: middle;
}

#header .newgame-wrapper #new-game {
  width: 100px;
  display: block;
  background-color: blueviolet;
  padding: 13px;
  border-radius: 6px;
  color: cyan;
  font: bold 15px Arial;
}

#header .newgame-wrapper #new-game:hover {
  background-color: deepskyblue;
}
</style>
