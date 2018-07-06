<template>
	<div class="preview">
		<preview v-for="(pre,index) in blocks" :key="index" :block="pre" />
	</div>
</template>

<script>
import axios from 'axios'
import preview from './preview'
export default {
	mounted() {
		this.pageGet();
	},
	data() {
		return {
			blocks: [],
		}
	},
	methods: {
		pageGet() {
			axios.get(`https://mp-dev.guzzu.cn/v3/frontapi/shopping-malls/${this.shoppingMallId}/pages/${this.$route.params.id}`).then(res => {
				console.log(res);
				this.blocks = res.data.blocks;
			})
		}
	},
	components: {
		preview,
	}
}
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
