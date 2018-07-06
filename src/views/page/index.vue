<template>
	<div class="contain">
		<!-- 表格 -->
		<el-button type="primary" @click="pageAdd">{{$t('PAGE_ADDPAGE')}}</el-button>
		<my-table @sortChange="sortChange" :gridData="gridData" :showData="showData" @rowClick="pageEdit" class="rowClick">
			<template @click.stop="clickStop" slot="sortIndex">
				<el-table-column prop="sortIndex" sortable='custom' :label="$t('PAGE_SORT_INDEX')">
					<div class="sortIndex" @click.stop="clickStop" slot-scope="scope">
						<myPop @sortUpdate="pageListGet" :row="scope.row" />
					</div>
				</el-table-column>
			</template>

			<el-table-column :label="$t('PAGE_OPERATE')" width="100">
				<template slot-scope="scope">
					<el-button @click="pageEdit(scope.row)" type="text" size="small">{{$t('PAGE_EDIT')}}</el-button>
					<el-button @click="pageDel(scope.row)" type="text" size="small">{{$t('PAGE_DELETE')}}</el-button>
				</template>
			</el-table-column>

		</my-table>

		<!-- 分页 -->
		<el-pagination class="pagination" @current-change="handleCurrentChange" layout="prev, pager, next" :current-page.sync="pagination.currentPage" :total="pagination.total">
		</el-pagination>
		<div class="clearfix"></div>
	</div>
</template>

<script>
import { doPost, doGet, doDel } from '@/api/api'
import { formatTime } from '@/utils/index'
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
		console.log(this.$route);
		this.pageListGet();
	},
	data() {
		return {
			gridData: [],
			showData: [
				{ prop: 'createdAt', label: 'PAGE_CREATED_AT', width: 120, type: 'time' },
				// { prop: 'sortIndex', label: 'PAGE_SORT_INDEX', width: 120, type: 'string', sortable: 'custom', clickAble: true },

				{ prop: 'pageTitle', label: 'PAGE_PAGE_TITLE', width: 120, type: 'lang', },
				{ prop: 'status', label: 'PAGE_STATUS', width: 120, type: 'string' },
			],
			pagination: {
				currentPage: 1,
				total: 0,
			},
			sort: '',
			sortIndex: 0,
			popoverVisible: []
		}
	},
	methods: {
		pageListGet() {
			this.gridData = [];
			// doGet('/shopping-malls/' + this.shoppingMallId + '/shopping-mall-pages', { p: this.pagination.currentPage - 1 }).then(res => {
			doGet(`/shopping-malls/${this.shoppingMallId}/pages`, { p: this.pagination.currentPage - 1, sort: this.sort }).then(res => {
				console.log(res);
				this.pagination.total = parseInt(res.headers['x-total-count']);
				this.gridData = res.data;
			})
		},
		handleCurrentChange(val) {
			this.pagination.currentPage = val;
		},
		pageEdit(row) {
			console.log(row);
			this.$router.push({ path: '/pages/' + row['_id'] });
		},
		pageDel(row) {
			this.delConfirm().then(() => {
				doDel(`/shopping-malls/${this.shoppingMallId}/pages/` + row['_id']).then(res => {
					this.confirmSuccess();
					this.pageListGet();
				})
			})

		},
		pageAdd() {
			this.$router.push({ path: '/pages/add' })
		},
		sortChange(e) {
			console.log(e);

			this.sort = e.prop ? (e.order === 'ascending' ? '' : '-') + e.prop : '';
			this.pageListGet();
		},
		clickStop(row) {
			console.log(row);
		},
		sortUpdate(row) {
			console.log(row);

		}
	},
	filters: {
		// _formatTime(val) {
		// 	return formatTime(val);
		// }
	},
	components: {
		myTable,
		myPop
	}
}
</script>

<style lang="scss" scoped>
.contain {
  padding: 10px;
  min-height: 300px;
  background: #fff;
  // padding: 20px 100px;
  // box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.2);
  .addBtn {
    margin: 10px 0;
  }
  .sortIndex {
    cursor: default;
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


