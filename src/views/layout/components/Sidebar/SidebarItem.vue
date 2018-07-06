<template>
	<div class="menu-wrapper">
		<template v-for="item in routes" v-if="!item.hidden&&item.children">

			<router-link v-if="item.children.length===1 && !item.children[0].children && !item.alwaysShow" :to="item.path+'/'+item.children[0].path" :key="item.children[0].name">
				<el-menu-item :index="item.path+'/'+item.children[0].path" :style="{color:$route.path.indexOf(item.path)!==-1?'rgb(64, 158, 255)':'rgb(191, 203, 217)'}">
					<svg-icon v-if="item.children[0].meta&&item.children[0].meta.icon" :icon-class="item.children[0].meta.icon"></svg-icon>
					<span v-if="item.children[0].meta&&item.children[0].meta.title" slot="title">{{$t(item.children[0].meta.title)}}</span>
				</el-menu-item>
			</router-link>

			<el-submenu v-else :index="item.name||item.path" :key="item.name">
				<template slot="title">
					<svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
					<span v-if="item.meta&&item.meta.title" slot="title">{{item.meta.title}}</span>
				</template>

				<template v-for="child in item.children" v-if="!child.hidden">
					<sidebar-item :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0" :routes="[child]" :key="child.path"></sidebar-item>

					<router-link v-else :to="item.path+'/'+child.path" :key="child.name">
						<el-menu-item :index="item.path+'/'+child.path">
							<svg-icon v-if="child.meta&&child.meta.icon" :icon-class="child.meta.icon"></svg-icon>
							<span v-if="child.meta&&child.meta.title" slot="title">{{$t(child.meta.title)}}</span>
						</el-menu-item>
					</router-link>
				</template>
			</el-submenu>

		</template>
	</div>
</template>

<script>
export default {
	name: 'SidebarItem',
	props: {
		routes: {
			type: Array
		},
		isNest: {
			type: Boolean,
			default: false
		}
	}
}
</script>
<style lang="scss" scoped>
.is-active {
  color: rgb(191, 203, 217);
  color: rgb(64, 158, 255) !important;
  background-color: rgb(48, 65, 86);
}
</style>

