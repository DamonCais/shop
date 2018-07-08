<template>
	<div class="preview">
		<preview v-for="(pre,index) in blocks" :key="index" :block="pre" />
	</div>
</template>

<script>
import preview from "./preview";
import { doPost, doGet, doPatch } from "@/api/api";
export default {
  mounted() {
    this.pageGet();
  },
  data() {
    return {
      blocks: []
    };
  },
  methods: {
    pageGet() {
      doGet("/page.get", { id: this.$route.params.id }).then(res => {
        this.blocks = res.data.pages[0].blocks;
      });
    }
  },
  components: {
    preview
  }
};
</script>

<style lang="scss" scoped>
.preview {
  max-width: 375px;
  min-height: 667px;
  margin: 0 auto;
  // border: 1px solid #000;
  background: #fff;
}
</style>
