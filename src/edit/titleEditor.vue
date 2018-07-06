<template>
	<div>
		<el-form ref="form" class="form" label-width="80px">
			<el-form-item :label="$t('TITLE_TITLE')">
				<el-input :placeholder="editlang==='en'?'please input':'请输入标题'" v-model="block.items[0].title[editlang]"></el-input>
			</el-form-item>
			<el-form-item :label="$t('TITLE_SUBTITLE')">
				<el-input :placeholder="editlang==='en'?'please input':'请输入子标题'" v-model="block.items[0].subtitle[editlang]"></el-input>
			</el-form-item>
			<div class="row">
				<linktype @linkChange="linkChange" :storesData="storesData" :item="block.items[0]" />
			</div>
		</el-form>
	</div>
</template>

<script>
import linktype from '@/core/linktype'
export default {
	props: {
		block: {
			type: Object,
			default() {
				return {
					title: {},
					subtitle: {},
				}
			}
		},
		storesData: {
			type: Object
		}
	},

	data() {
		return {

		}
	},
	methods: {
		onSubmit() {
			console.log('submit!');
		},
		linkChange(item) {
			this.block.items.splice(0, 1, item);
		}
	},
	components: {
		linktype,
	}
}
</script>

<style lang="scss" scoped>
.form {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  .row {
    padding: 0 40px;
    font-size: 14px;
    color: #666;
  }
}
</style>
