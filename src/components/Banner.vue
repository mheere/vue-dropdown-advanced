<template>
  <div class="banner" :style="bannerStyles" :class="`banner__${position}`">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
const defaultStyles = {
  left: 0,
  right: 0,
};
const Banner = {
  props: {
    name: "Banner",
    position: {
      type: String,
      default: 'top',
      validator(position) {
        return ['top', 'bottom'].indexOf(position) > -1;
      },
    },
    styles: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      bannerStyles: {
        ...defaultStyles,
        ...this.styles,
      },
    };
  },
};

export default Banner;

</script>
<style lang="scss" scoped>
.banner {
  padding: 12px;
  background-color: #f5eebd;
  color: #b96903;
  text-align: left;
  position: fixed;
  z-index: 2;
}
.banner__top {
  top: 0;
}
.banner__bottom {
  bottom: 0;
}
</style>