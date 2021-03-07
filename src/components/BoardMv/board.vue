<template>
  <div
    class="game__board"
    :class="[
      tie ? '-tie' : ''
    ]"
  >
    <cell
      v-for="(cell, index) in grid"
      :key="index"
      :index="index"
      :player="cell"
      :is-win-cell="winningCells && winningCells.includes(index)"
      @onCellClick="handleCellClick"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { SET_BASE_STATE } from '../../store/mutations';
import { WINNING_STATES, PLAYER_X, PLAYER_O } from '../../store/constants';

import Cell from '../CellAv';

export default {
  components: {
    Cell,
  },
  computed: {
    ...mapState(['grid', 'playerTurn', 'turnCounter', 'winningCells', 'tie']),
  },
  methods: {
    calculateWinner(grid, turn) {
      for (const win_state of WINNING_STATES) {
        const winCells = [];
        for (const cell of win_state) {
          if (grid[cell] === turn) {
            winCells.push(cell);
          }
        }
        if (winCells.length === 3) {
          return { winner: turn, winningCells: winCells };
        }
      }
      return { winner: null, winningCells: null };
    },
    handleCellClick(index) {
      const newGrid = this.grid.slice();
      newGrid[index] = this.playerTurn;
      this.$store.commit(SET_BASE_STATE, { name: 'grid', payload: newGrid });

      const { winner: winner_, winningCells: winningCells_ } = this.calculateWinner( newGrid, this.playerTurn );

      if (winner_) {
        this.$store.commit(SET_BASE_STATE, { name: 'winner', payload: winner_ });
        this.$store.commit(SET_BASE_STATE, { name: 'winningCells', payload: winningCells_ });
      } else {
        this.$store.commit(SET_BASE_STATE, { name: 'turnCounter', payload: this.turnCounter + 1 });
        if (this.turnCounter === 10) {
          this.$store.commit(SET_BASE_STATE, { name: 'tie', payload: true });
        } else {
          const player = this.playerTurn === PLAYER_X ? PLAYER_O : PLAYER_X;
          this.$store.commit(SET_BASE_STATE, { name: 'playerTurn', payload: player });
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .game__board {
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    grid-template-columns: repeat(3, 1fr);
    flex-direction: column;
    width: 50vmin;
    height: 50vmin;
    padding: 4px;

    &.-tie {
      opacity: 0.2;
    }
  }
</style>
