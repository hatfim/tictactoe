<template>
  <div class="control number">
    <button class="decrement-button" :disabled="decrementDisabled" @click="decrement">−</button>
    <button class="increment-button" :disabled="incrementDisabled" @click="increment">+</button>
    <input
        type="number"
        :disabled="inputDisabled"
        :min="min"
        :max="max"
        :step="step"
        v-model.number="currentValue"
        @blur="currentValue = value"
        @keydown.esc="currentValue = value"
        @keydown.enter="currentValue = value"
        @keydown.up.prevent="increment"
        @keydown.down.prevent="decrement"
    />
  </div>
</template>
<script>
export default {
  props: {
    disabled: Boolean,
    max: {
      type: Number,
      default: Infinity
    },
    min: {
      type: Number,
      default: -Infinity
    },
    value: {
      required: true
    },
    step: {
      type: Number,
      default: 1
    }
  },

  data() {
    return {
      currentValue: this.value,
      decrementDisabled: false,
      incrementDisabled: false,
      inputDisabled: false,
    }
  },

  watch: {
    value(val) {
      this.currentValue = val
    }
  },

  methods: {
    increment() {
      if (this.disabled || this.incrementDisabled) {
          return
      }
      console.log('called');

      let newVal = this.currentValue + 1 * this.step
      this.decrementDisabled = false

      this._updateValue(newVal)
    },
    decrement() {
      if (this.disabled || this.decrementDisabled) {
          return
      }
      console.log('called');

      let newVal = this.currentValue + -1 * this.step
      this.incrementDisabled = false

      this._updateValue(newVal)
    },
    _updateValue(newVal) {
      const oldVal = this.currentValue

      if (oldVal === newVal || typeof this.value !== 'number') {
          return
      }
      if (newVal <= this.min) {
          newVal = this.min
          this.decrementDisabled = true
      }
      if (newVal >= this.max) {
          newVal = this.max
          this.incrementDisabled = true
      }
      this.currentValue = newVal
      this.$emit('input', this.currentValue)
    }
  },

  mounted() {
    if (this.value == this.min) {
      this.decrementDisabled = true
    }
  }
}
</script>

<style lang="scss" scoped>
$link-color: #000;
$gray-light: #ffcc33;
$gray-medium: #adb5bd;
$gray-dark: #343d46;
$bg-color: #ffcc33;

.control.number {
  display: inline-flex;
  position: relative;
  width: 100%;
  height: 3em;
  overflow: hidden;
  border: 1px solid $gray-light;
  border-radius: 3px;
  max-width: calc(180 / 16 * 1rem);
  background: #555;

  input {
    font-size: .875rem;
    flex: 1 0;
    color: #fff;
    line-height: 1.65;
    height: 3em;
    margin: 0 auto;
    padding-left: .5rem;
    padding-right: calc(82 / 16 * 1rem);
    text-align: left;
    width: 100%;
    max-width: 100%;
    vertical-align: top;
    background: transparent;
    border: 0;
    // Firefox-specific hack
    -moz-appearance: textfield;

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    &:hover,
    &:active,
    &:focus {
      border: 0;
      outline: none;
    }
  }

  button {
    background-color: #ffcc33;
    border: 0px solid $gray-light;
    border-left-width: 1px;
    border-radius: 0;
    color: $gray-dark;
    cursor: pointer;
    flex: 0 1;
    font-family: sans-serif;
    font-size: .875rem;
    font-weight: bold;
    line-height: 1.7;
    position: absolute;
    top: 0;
    text-align: center;
    width: 3em;
    height: calc(3em + 4px);
    user-select: none;
    z-index: 5;

    &:hover,
    &:active,
    &:focus {
      border: 0;
      color: $link-color;
      outline: none;
    }

    &:hover {
      & ~ .input {
        border: 0;
      }
    }
    &:active,
    &:focus {
      & ~ .input {
        border: 0;
        box-shadow: none;
      }
    }
    &:disabled,
    &.is-disabled {
      color: $gray-medium;
      opacity: 1;
    }
  }

  .increment-button {
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
    right: 0;
  }

  .decrement-button {
    right: calc(3em + 1px);
  }
}
</style>
