<template>
  <div
    class="cell"
    :class='[
      !player ? "-selectable" : "",
      !winner ? "-active" : "",
      isWinCell? "-is-winning" : "",
      !winner ? "-turn-" + playerTurn : "",
    ]'
    @click="handleClick"
    :data-value="player"
  ></div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    index: {
      type: Number,
      default: 0,
    },
    player: {
      type: String,
      default: null,
    },
    isWinCell: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    ...mapState(['grid', 'winner', 'playerTurn']),
  },

  methods: {
    handleClick() {
      if (!this.player && !this.winner) {
        this.$emit('onCellClick', this.index)
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  .cell {
    cursor: pointer;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 7vmin;
    font-weight: bold;
    text-align: center;
    background: #171717;
    color: white;
    border: 1px solid #464646;

    &[data-value="x"] {
      &::before {
        content: "";
        position: absolute;
        width: 50%;
        height: 0.25em;
        background-color: white;
        transform: rotate(-45deg);
      }

      &::after {
        content: "";
        position: absolute;
        width: 50%;
        height: 0.25em;
        background-color: white;
        transform: rotate(45deg);
      }
    }
    &[data-value="o"] {
      &::before {
        content: "";
        position: absolute;
        width: 50%;
        height: 50%;
        border: 0.25em solid white;
        border-radius: 50%;
      }
    }
    &.-is-winning {
      position: relative;
      z-index: 1;
      background-color: #ffcc33;
      border-color: #ffcc33;
    }
  }
</style>
