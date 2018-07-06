<template>
	<el-breadcrumb class="app-breadcrumb" separator="/">
		<transition-group name="breadcrumb">
			<el-breadcrumb-item v-for="(item,index)  in levelList" v-if="index!==levelList.length-1" :key="index">
				<!-- <span v-if="item.redirect==='noredirect'||index==levelList.length-1" class="no-redirect">{{$t(item.meta.title)}}</span> -->
				<router-link :to="'/'+item+'/'">{{$t(item)}}</router-link>
				<!-- <span v-else class="no-redirect">{{$t(item)}}</span> -->
				<!-- <router-link v-else :to="item.redirect||item.path">{{item.meta.title}}</router-link> -->
			</el-breadcrumb-item>
			<el-breadcrumb-item v-show="$route.meta.bread" :key="-1">
				<span class="no-redirect">{{bread}}</span>
			</el-breadcrumb-item>
		</transition-group>
	</el-breadcrumb>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	created() {
		this.getBreadcrumb()
		this.getBread()
	},
	computed: {
		...mapGetters(['bread'])
	},
	data() {
		return {
			levelList: null
		}
	},
	watch: {
		$route() {
			this.getBreadcrumb()
		}
	},
	methods: {
		getBreadcrumb() {
			// let matched = this.$route.matched.filter(item => item.name)
			this.levelList = this.$route.path.split('/').slice(1);
		},
		getBread() {

		}
	},

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 10px;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
