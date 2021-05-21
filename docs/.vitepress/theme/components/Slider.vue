<template>
  <input type="range" :max="max" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
</template>

<script>
export default {
  name: 'Slider',
  props: {
    modelValue: {
      type: Number,
      default: null
    },
    max: {
      type: Number,
      default: 15
    }
  },
  emits: ['update:modelValue']
}
</script>

<style lang="scss" scoped>
$track-color: #ffffff !default;
$thumb-color: #3eaf7c !default;

$thumb-radius: 12px !default;
$thumb-height: 20px !default;
$thumb-width: 20px !default;
$thumb-shadow-size: 2px !default;
$thumb-shadow-blur: 4px !default;
$thumb-shadow-color: rgba(0, 0, 0, 0.2) !default;
$thumb-border-width: 0px !default;
$thumb-border-color: #eceff1 !default;

$track-width: 100% !default;
$track-height: 8px !default;
$track-shadow-size: 1px !default;
$track-shadow-blur: 1px !default;
$track-shadow-color: rgba(0, 0, 0, 0.05) !default;
$track-border-width: 1px !default;
$track-border-color: rgb(107, 114, 128) !default;

$track-radius: 5px !default;
$contrast: 5% !default;

$ie-bottom-track-color: darken($track-color, $contrast) !default;

@mixin shadow($shadow-size, $shadow-blur, $shadow-color) {
  box-shadow: $shadow-size $shadow-size $shadow-blur $shadow-color, 0 0 $shadow-size lighten($shadow-color, 5%);
}

@mixin track {
  height: $track-height;
  transition: all 0.2s ease;
  width: $track-width;
}

@mixin thumb {
  @include shadow($thumb-shadow-size, $thumb-shadow-blur, $thumb-shadow-color);
  background: $thumb-color;
  border: $thumb-border-width solid $thumb-border-color;
  border-radius: $thumb-radius;
  box-sizing: border-box;
  height: $thumb-height;
  width: $thumb-width;
}

[type='range'] {
  -webkit-appearance: none;
  background: transparent;
  margin: $thumb-height / 2 0;
  width: $track-width;
  cursor: pointer;

  &::-moz-focus-outer {
    border: 0;
  }

  &:focus {
    outline: 0;

    &::-webkit-slider-runnable-track {
      background: lighten($track-color, $contrast);
    }

    &::-ms-fill-lower {
      background: $track-color;
    }

    &::-ms-fill-upper {
      background: lighten($track-color, $contrast);
    }
  }

  &::-webkit-slider-runnable-track {
    @include track;
    @include shadow($track-shadow-size, $track-shadow-blur, $track-shadow-color);
    background: $track-color;
    border: $track-border-width solid $track-border-color;
    border-radius: $track-radius;
  }

  &::-webkit-slider-thumb {
    @include thumb;
    -webkit-appearance: none;
    margin-top: ((-$track-border-width * 2 + $track-height) / 2 - $thumb-height / 2);
  }

  &::-moz-range-track {
    @include shadow($track-shadow-size, $track-shadow-blur, $track-shadow-color);
    @include track;
    background: $track-color;
    border: $track-border-width solid $track-border-color;
    border-radius: $track-radius;
    height: $track-height / 2;
  }

  &::-moz-range-thumb {
    @include thumb;
  }

  &::-ms-track {
    @include track;
    background: transparent;
    border-color: transparent;
    border-width: ($thumb-height / 2) 0;
    color: transparent;
  }

  &::-ms-fill-lower {
    @include shadow($track-shadow-size, $track-shadow-blur, $track-shadow-color);
    background: $ie-bottom-track-color;
    border: $track-border-width solid $track-border-color;
    border-radius: ($track-radius * 2);
  }

  &::-ms-fill-upper {
    @include shadow($track-shadow-size, $track-shadow-blur, $track-shadow-color);
    background: $track-color;
    border: $track-border-width solid $track-border-color;
    border-radius: ($track-radius * 2);
  }

  &::-ms-thumb {
    @include thumb;
    margin-top: $track-height / 4;
  }

  &:disabled {
    opacity: 50%;
    cursor: not-allowed;
  }
}
</style>
