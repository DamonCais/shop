<template>
	<div class="contain">
		<!-- 表格 -->
		<el-table stripe border :data="gridData">
			<el-table-column v-for="(item,index) in showData" :key="index" :sortable="item.sortable" :label="$t(item.label)">
				<template slot-scope="scope">
					<div>
						<img v-if="item.type ==='image'" :src="scope.row|deepGet(item.prop)" alt="" style="width: 50px;height: 50px">
						<span v-if="item.type ==='string'">{{scope.row|deepGet(item.prop)}}</span>
						<!-- <el-button v-if="item.type ==='button'" @click="toUrl(item.url + scope.row._id)">{{item.prop}}</el-button> -->
					</div>
				</template>
			</el-table-column>
			<el-table-column fixed="right" :label="$t('SHOPPINGMALL_OPERATE')" width="100">
				<template slot-scope="scope">
					<el-button @click="shoppingmallSel(scope.row)" type="text" size="small">{{$t('SHOPPINGMALL_SELECT')}}</el-button>
					<!-- <el-button type="text" size="small">编辑</el-button> -->
				</template>
			</el-table-column>
		</el-table>
		<!-- 分页 -->
		<el-pagination class="pagination" @current-change="handleCurrentChange" layout="prev, pager, next" :current-page.sync="pagination.currentPage" :total="pagination.total">
		</el-pagination>
		<div class="clearfix"></div>
	</div>
</template>

<script>
//storeXXX  for the dialog 
import storesel from '@/core/storesel'
import { doPost, doGet, doDel } from '@/api/api'
export default {
	mounted() {
		this.shoppingmallListGet();
	},
	data() {
		return {
			gridData: [],
			showData: [
				// { prop: 'image.url', label: 'image', width: 120, type: 'image' },
				{ prop: 'name.en', label: 'SHOPPINGMALL_NAME', width: 120, type: 'string' },
				// { prop: 'products.length', label: 'quantity', width: 120, type: 'string' },
			],
			pagination: {
				currentPage: 1,
				total: 50,
			},

			storeGridData: [],
			storeShowData: [
				{ prop: 'logo.url', label: 'logo', width: 120, type: 'image' },
				{ prop: 'name.en', label: 'name', width: 120, type: 'string' },
			],
			storeDialog: false,
			storePagination: {
				currentPage: 1,
				total: 0,
			},

		}
	},
	methods: {
		shoppingmallListGet() {
			this.gridData = [];
			doGet('/shopping-malls', { p: this.pagination.currentPage - 1 }).then(res => {
				console.log(res);
				this.pagination.total = parseInt(res.headers['x-total-count']);
				this.gridData = res.data;
			})
		},
		handleCurrentChange(val) {
			this.pagination.currentPage = val;
			this.storeListGet();
		},
		shoppingmallSel(row) {
			// doPost(`/shopping-malls/${row._id}/select`).then(res => {
			// if (res.status === 200) {
			// 	this.$message({
			// 		message: 'switch success',
			// 		type: 'success'
			// 	})
			this.$store.dispatch('setShoppingMallId', row._id)
			this.$router.push({ path: '/' })
			// }
			// })
		}
	},
	components: {
		storesel,
	}
}
</script>

<style lang="scss" scoped>
.contain {
  // width: 1000px;
  margin: 10px;
  min-height: 300px;
  background: #fff;
  padding: 20px 100px;
  box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.2);
  .addBtn {
    margin: 10px 0;
  }
}
.pagination {
  margin: 5px 0;
  float: right;
}
.btn {
  margin: 5px 0;
  float: right;
}
.clearfix {
  clear: both;
}
</style>
