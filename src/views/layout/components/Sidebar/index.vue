<template>
	<div class="asideBar">
		<!-- <div class="asideFoot" @click="shoppingmallSel">切换商城</div> -->
		<scroll-bar>

			<el-menu mode="vertical" :show-timeout="200" :default-active="$route.path" :collapse="isCollapse" background-color="#304156" text-color="#bfcbd9" active-text-color="#409EFF">
				<sidebar-item :routes="routes"></sidebar-item>
			</el-menu>

		</scroll-bar>
		<!-- <div class="asideFoot" @click="shoppingmallSel">切换商城</div> -->
	</div>

</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'

export default {
	components: { SidebarItem, ScrollBar },
	computed: {
		...mapGetters([
			'sidebar'
		]),
		routes() {
			return this.$router.options.routes
		},
		isCollapse() {
			return !this.sidebar.opened
		}
	},
	methods: {
		shoppingmallSel() {
			this.$router.push({ path: '/shoppingmallList' })
		}
	}
}
</script>

<style lang="scss" scoped>
.asideBar {
  position: relative;
}
.asideFoot {
  font-size: 14px;
  display: block;
  position: absolute;
  bottom: 0;
  width: 100%;
  // background: red;
  text-align: center;
  height: 56px;
  line-height: 56px;
  // padding-left: 20px;
  color: rgb(191, 203, 217);
  z-index: 2000 !important;
  cursor: pointer;
}
</style>
