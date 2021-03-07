<template>
  <span class="game__status__text" v-html="status" />
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['playerTurn', 'turnCounter', 'winner', 'tie']),

    status() {
      let status = `Turn ${this.turnCounter}: <strong>${this.playerTurn}'s</strong> turn`;
      if (this.winner) {
        status = `The <strong>winner</strong> is <strong>${this.winner}</strong>`;
      } else if (this.tie) {
        status = "<strong>Tie</strong>";
      }

      return status;
    }
  },
}
</script>

<style lang="scss" scoped>
.game__status__text {
  color: #fff;
  font-size: 2em;
}
</style>
