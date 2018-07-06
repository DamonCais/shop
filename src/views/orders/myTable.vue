<template>
	<div>
		<el-table @filter-change="filterChange" @sort-change="sortChange" stripe :data="gridData" style="width:100%">
			<div v-for="(item,index) in showData" :prop="item.prop" :key="index+1">
				<el-table-column :column-key="item.prop" :filters="item.filters" :prop="item.prop" :width="item.width" :sortable="item.sortable" :label="$t(item.label)">
					<template slot-scope="scope">
						<div>
							<img v-if="item.type ==='image'" :src="scope.row|deepGet(item.prop)" alt="" style="width: 50px;height: 50px">
							<span v-if="item.type ==='string'">{{scope.row|deepGet(item.prop)}}</span>
							<span v-if="item.type ==='price'">{{'￥'+scope.row[item.prop]/100}}</span>
							<div v-if="item.type ==='lang'">
								<span v-if="_(scope.row,item.prop+'.'+editlang)">
									{{_(scope.row,item.prop+'.'+editlang)}}
								</span>
								<span style="color:#aaa;" v-else>
									{{_(scope.row,item.prop+'.en')}}
									<i style="color:#000;text-style:none;">(en)</i>
								</span>
							</div>
							<div v-if="item.type ==='btn'" @click="onClick(scope.row)" style="cursor: pointer;">
								<span>{{scope.row|deepGet(item.prop)}}</span>
							</div>

							<!-- <el-button v-if="item.type ==='button'" @click="toUrl(item.url + scope.row._id)">{{item.prop}}</el-button> -->
						</div>
					</template>
				</el-table-column>
			</div>
			<slot />
		</el-table>
	</div>
</template>

<script>
export default {
	props: {
		showData: {
			type: Array,
		},
		gridData: {
			type: Array,
		}
	},
	data() {
		return {}
	},
	methods: {
		filterChange(e) {
			this.$emit('filterChange', e);
		},
		sortChange(e) {
			this.$emit('sortChange', e);
		},
		onClick(row) {
			this.$emit('onClick', row);
		}
	}
}
</script>

<style>
</style>
