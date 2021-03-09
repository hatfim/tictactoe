<template>
  <div id="app">
    <div class="game">
      <div class="game__header">
        <h1>Tic Tac Toe</h1>
        <p>With customizable board size!</p>
        <div class="game__option">
          <number v-model="size" :min="0" :max="100" :disabled="gameActive" />
          <div  class="game__action">
            <button @click="handleOptionClick">{{ buttonText }}</button>
          </div>
        </div>
      </div>
      <template v-if="gameActive">
        <div class="game__status">
          <Status />
        </div>
        <div class="game__board-wrapper">
          <Board />
        </div>
        <div  class="game__action">
          <button @click="handleResetClick">Reset</button>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { SET_BASE_STATE, RESET_STATE, RESET_GAME } from './store/mutations';
import Board from './components/BoardMv';
import Status from './components/StatusAv';
import Number from './components/NumberAv';

export default {
  name: 'App',
  components: {
    Board,
    Status,
    Number
  },
  computed: {
    ...mapState(['gameActive', 'boardSize', 'grid']),
    size: {
      set(size) {
        this.$store.commit(SET_BASE_STATE, { name: 'boardSize', payload: size });
      },
      get(){
        return this.boardSize;
      }
    },
    buttonText() {
      return this.gameActive ? 'Reset Option' : 'Play';
    }
  },
  methods: {
    ...mapActions(['gameInit', 'gameReset']),
    setWinnerCell() {
      const numSquares = this.grid.length;
      let winnerCell = [];

      for (let i = 0; i < numSquares; i += 1) { // iterate over entire board
        if ((i % this.boardSize) == 0) {
          const rowCheck = [];
          for (let squareNum = i; squareNum < (i + this.boardSize); squareNum += 1) { // iteration over column 1
            rowCheck.push(squareNum);
          };
          winnerCell.push(rowCheck);

        };

        if (i < this.boardSize) { //
          const colCheck = [];
          for (let squareNum = i; squareNum < numSquares; squareNum += this.boardSize) { // iteration over row 1
            colCheck.push(squareNum);
          };
          winnerCell.push(colCheck);
        };

      };

      const diag1Check = [];
      for (let i = 0; i < numSquares; i += 1) { // first iteration over board
        if ((i % (this.boardSize + 1)) == 0) { // use condition if iterator % BOARDSIZE + 1 === 0 to get left diagonals
          diag1Check.push(i);
        };
      };

      const diag2Check = []; // Needs to be outside of for loop to prevent overwriting array
      for (let i = (this.boardSize - 1); i < (numSquares - 1); i += 1) { // first iteration over board
        if ((i % (this.boardSize - 1)) == 0) { // use condition if iterator % BOARDSIZE - 1 === 0 to get right diagonals
          diag2Check.push(i);
        };
      };
      winnerCell.push(diag1Check);
      winnerCell.push(diag2Check);

      this.$store.commit(SET_BASE_STATE, { name: 'winningState', payload: winnerCell });
    },
    handleResetClick() {
      this.gameReset();
    },
    handleOptionClick() {
      const el = document.body;

      if(this.gameActive) {
        this.$store.commit(RESET_STATE);
        el.setAttribute("style",'');
      } else {
        const size = this.boardSize * 150;
        this.gameInit();

        if(window.innerWidth < size + 24) {
          el.setAttribute("style",`width:${(this.boardSize * 150) + 100}px;`);
        }

        this.setWinnerCell();
      }
    }
  },
  mounted() {
    this.size = this.boardSize;
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
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 24px;
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
  justify-content: flex-end;
  flex-direction: column;
}

.game__header {
  text-align: center;
  color: #fff;

  h1 {
    margin-bottom: 0;
  }

  p {
    margin: 0 auto 2em;
  }
}

.game__board-wrapper{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  transition: padding-right 0.2s;
  padding: 0 0 2.5em;
}
.game__status {
  text-align: center;
  font-weight: 300;
  margin: 2em auto;

  strong {
    font-weight: 700;
  }
}
.game__option {
  display: flex;
  justify-content: center;
  align-items: center;
}
.game__action {
  text-align: center;
  margin-left: 2em;

  button {
    background: #ffcc33;
    border: none;
    color: #171717;
    font-weight: 600;
    font-size: 1.2em;
    padding: 0.5em 2em;
    border-radius: 3px;
    cursor: pointer;
    height: 2.5em;
    transition: background 0.1s ease-in-out;
  }
}
</style>
