<template>
  <div id="app">
    <div class="game">
      <div class="game__status">
        <Status />
      </div>
      <div class="game__board-wrapper">
        <Board />
      </div>
      <div  class="game__reset">
        <button @click="handleReset">Reset</button>
      </div>
    </div>
  </div>
</template>

<script>
import { RESET_STATE } from './store/mutations';
import Board from './components/BoardMv';
import Status from './components/StatusAv';

export default {
  name: 'App',
  components: {
    Board,
    Status
  },
  methods: {
    handleReset() {
      this.$store.commit(RESET_STATE);
    }
  }
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;700&display=swap');

*, :before, :after {
  box-sizing: border-box;
}

body {
  margin: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #171717;
}
#app {
  font-family: 'Open Sans', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.game {
  position: relative;
  display: flex;
  flex-direction: column;

  height: 100%;
  overflow: hidden;
}

.game__board-wrapper{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  transition: padding-right 0.2s;
}
.game__status {
  text-align: center;
  font-weight: 300;
  margin-bottom: 2em;

  strong {
    font-weight: 700;
  }
}

.game__reset {
  text-align: center;

  button {
    background: #ffcc33;
    margin-top: 1em;
    border: none;
    color: #171717;
    font-weight: 600;
    font-size: 1.2em;
    padding: 0.5em 2em;
    border-radius: 0.5em;
    cursor: pointer;
    transition: background 0.1s ease-in-out;
  }
}
</style>
