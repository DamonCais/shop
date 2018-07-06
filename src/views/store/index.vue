<template>
	<div class="contain">
		<!-- 表格 -->
		<el-button type="primary" @click="storeAdd">{{$t('STORE_ADDSTORE')}}</el-button>
		<my-table :gridData="gridData" :showData="showData" @sortChange="sortChange" @rowClick="storeView" class="rowClick">
			<template slot="sortIndex">
				<el-table-column prop="sortIndex" sortable='custom' :label="$t('PAGE_SORT_INDEX')">
					<div class="sortIndex" @click.stop="clickStop" slot-scope="scope">
						<myPop @sortUpdate="pageListGet" :row="scope.row" />
					</div>
				</el-table-column>
			</template>
			<el-table-column fixed="right" :label="$t('STORE_OPERATE')">
				<template slot-scope="scope">
					<el-button @click="storeView(scope.row)" type="text" size="small">{{$t('STORE_VIEW')}}</el-button>
					<el-button @click="storeDel(scope.row)" type="text" size="small">{{$t('STORE_DELETE')}}</el-button>
					<!-- <el-button type="text" size="small">编辑</el-button> -->
				</template>
			</el-table-column>

		</my-table>

		<!-- 分页 -->
		<el-pagination class="pagination" @current-change="handleCurrentChange" layout="prev, pager, next" :current-page.sync="pagination.currentPage" :total="pagination.total">
		</el-pagination>
		<div class="clearfix"></div>
		<storesel ref="storesel" title="STORESEL_SELECT" :pagination="storePagination" @pageChange="pageChange" @storesel="storesel" v-model="storeDialog" :multi="false" :showData="storeShowData" :gridData="storeGridData" />
	</div>
</template>

<script>
//storeXXX  for the dialog 
import storesel from '@/core/storesel'
import { doPost, doGet, doDel } from '@/api/api'
import myTable from '@/components/myTable'
import { mapGetters } from 'vuex'
import myPop from '@/components/myPop'
export default {
	computed: {
		...mapGetters(['status'])
	},

	beforeMount() {
		let key = this.$route.name
		this.sort = this.status[key].sort;
		this.pagination = this.status[key].pagination
		this.q = this.status[key].q;
	},
	beforeRouteLeave(to, from, next) {
		// 导航离开该组件的对应路由时调用
		this.$store.dispatch('setStatus', {
			type: this.$route.name,
			sort: this.sort,
			pagination: this.pagination,
			q: this.q,
		}).then(() => {
			next()
		})
	},
	mounted() {
		this.pageListGet();
	},
	data() {
		return {
			gridData: [],
			showData: [
				{ prop: 'name', label: 'STORE_NAME', type: 'lang', clickAble: false },

				// { prop: 'sortIndex', label: 'STORE_SORT_INDEX', type: 'string', sortable: 'custom' },

				{ prop: 'logo.url', label: 'STORE_LOGO', width: 80, type: 'image' },
			],
			pagination: {
				currentPage: 1,
				total: 50,
			},

			storeGridData: [],
			storeShowData: [
				{ prop: 'logo.url', label: 'STORESEL_LOGO', width: 120, type: 'image' },
				{ prop: 'name', label: 'STORESEL_NAME', width: 120, type: 'lang' },
			],
			storeDialog: false,
			storePagination: {
				currentPage: 1,
				total: 50,
			},
			sort: '',
		}
	},
	methods: {
		pageListGet() {
			this.gridData = [];
			doGet(`/shopping-malls/${this.shoppingMallId}/stores`, { p: this.pagination.currentPage - 1, sort: this.sort }).then(res => {
				console.log(res);
				this.pagination.total = parseInt(res.headers['x-total-count']);
				this.gridData = res.data;
			})
		},
		handleCurrentChange(val) {
			this.pagination.currentPage = val;
			this.pageListGet();
		},
		storeView(row) {
			this.$router.push({ path: '/stores/' + row['_id'] });
		},
		storeDel(row) {
			this.delConfirm().then(() => {
				doDel(`shopping-malls/${this.shoppingMallId}/stores/${row['_id']}`).then(res => {
					this.confirmSuccess();
					this.pageListGet();
				})
			})

		},
		storeAdd() {
			this.storeGridData = [];
			doGet('/all-stores', { p: this.storePagination.currentPage - 1 }).then(res => {
				console.log(res);
				this.storePagination.total = parseInt(res.headers['x-total-count']);
				this.storeGridData = res.data;
				this.storeDialog = true;
			})
		},
		pageChange(val) {
			this.storePagination.currentPage = val;
			this.storeAdd();
		},
		storesel(data) {
			console.log(data[0]['_id']);
			doPost(`/shopping-malls/${this.shoppingMallId}/stores`, { store: data[0]['_id'] }).then(res => {
				console.log(res);
				this.$message({
					message: 'save success',
					type: 'success'
				})
				this.pageListGet();
			}).catch(() => {
				this.$message({
					message: 'save error',
					type: 'error'
				})
			})
			this.storeDialog = false;
		},
		sortChange(e) {
			console.log(e);

			this.sort = e.prop ? (e.order === 'ascending' ? '' : '-') + e.prop : '';
			this.pageListGet();
		},
		clickStop(row) {
		},
	},
	components: {
		storesel,
		myTable,
		myPop
	}
}
</script>

<style lang="scss" scoped>
.contain {
  min-height: 300px;
  background: #fff;
  padding: 10px;

  // min-height: 300px;
  // background: #fff;
  // padding: 20px 100px;
  // box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.2);
  .addBtn {
    margin: 10px 0;
  }
  .sortIndex {    cursor: default;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    display: flex;
    padding-left: 10px;
    justify-content: flex-start;
    align-items: center;
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
