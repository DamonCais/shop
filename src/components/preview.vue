<template>
	<div class="preview">
		<component :class="{'onedit':onEdit}" :block="block" v-bind:is="block.type|titlefilter"></component>
	</div>
</template>

<script>
import cell from "@/preview/cell";
import swiper from "@/preview/swiper";
import spacer from "@/preview/spacer";
import navgroup from "@/preview/navgroup";
import celltitle from "@/preview/title";
import product from "@/preview/product";
import cellheader from "@/preview/header";
export default {
  components: {
    cell,
    banner: swiper,
    spacer,
    navgroup,
    celltitle,
    productgroup: product,
    cellheader
  },
  props: {
    block: {
      type: Object
    },
    onEdit: {
      type: Boolean
    }
  },
  data() {
    return {};
  },
  filters: {
    titlefilter(val) {
      if (val === "title" || val === "header") {
        return "cell" + val;
      }
      return val;
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.preview {
  width: 100%;
  .onedit {
    border: 1px dashed red;
    &:hover {
      border-left: 1px dashed red;
      border-right: 1px dashed red;
      border-top: 1px solid red;
      border-bottom: 1px solid red;
    }
  }
}
</style>
