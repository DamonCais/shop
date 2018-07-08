<template>
	<div class="block">

		<el-form ref="form" label-width="80px">
			<el-form-item :label="$t('HEADER_PAGE_TITLE')">
				<el-input placeholder='请输入页面标题' v-model="block.pageTitle"></el-input>
			</el-form-item>
			<el-form-item :label="$t('HEADER_PAGE_DESCRIPTION')">
				<el-input placeholder="请输入页面描述" v-model="block.pageDescription"></el-input>
			</el-form-item>
			<!-- <el-form-item :label="$t('HEADER_PAGE_TABLABEL')">
				<el-input :placeholder="editlang==='en'?'please input':'请输入分页标签'" v-model="block.tabLabel"></el-input>
			</el-form-item> -->
			<el-form-item :label="$t('HEADER_PAGE_TABINDEX')">
				<el-input-number v-model="block.sortIndex" :min="0" :max="10" label="描述文字"></el-input-number>
			</el-form-item>
			<!-- <el-form-item label="背景颜色:">
				<el-color-picker v-model="block.color" show-alpha></el-color-picker>
			</el-form-item> -->
		</el-form>

	</div>
</template>

<script>
export default {
  props: {
    block: {
      type: Object
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.block {
  min-width: 400px;
  margin-top: 20px;
}
</style>
