<template>
	<div class="contain">
		<!-- 表格 -->
		<el-button type="primary" @click="categoryAdd">{{$t('CATEGORY_ADDCATEGORY')}}</el-button>

		<my-table :gridData="gridData" :showData="showData" @sortChange="sortChange" @rowClick="categoryEdit" class="rowClick">
			<!-- 编辑 -->
			<template @click.stop="clickStop" slot="sortIndex">
				<el-table-column prop="sortIndex" sortable='custom' :label="$t('PAGE_SORT_INDEX')">
					<div class="sortIndex" @click.stop="clickStop" slot-scope="scope">
						<myPop @sortUpdate="pageListGet" :row="scope.row" />
					</div>
				</el-table-column>
			</template>
			<el-table-column fixed="right" :label="$t('CATEGORY_OPERATE')" width="100">
				<template slot-scope="scope">
					<el-button @click="categoryEdit(scope.row)" type="text" size="small">{{$t('CATEGORY_EDIT')}}</el-button>
					<el-button @click="categoryDel(scope.row)" type="text" size="small">{{$t('CATEGORY_DELETE')}}</el-button>

					<!-- <el-button type="text" size="small">编辑</el-button> -->
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

				// { prop: 'sortIndex', label: 'CATEGORY_SORT_INDEX', width: 180, type: 'string', sortable: 'custom' },

				{ prop: 'image.url', label: 'CATEGORY_IMAGE', width: 90, type: 'image' },
				{ prop: 'name', label: 'CATEGORY_NAME', width: 180, type: 'lang', sortChange: 'sortChange', clickAble: false },
				{ prop: 'products.length', label: 'CATEGORY_QUANTITY', width: 120, type: 'string', default: 0 },

			],
			sort: '',
			pagination: {
				currentPage: 1,
				total: 0,
			}
		}
	},
	methods: {
		pageListGet() {
			this.gridData = [];
			doGet(`shopping-malls/${this.shoppingMallId}/categories`, { p: this.pagination.currentPage - 1, sort: this.sort }).then(res => {
				console.log(res);
				this.pagination.total = parseInt(res.headers['x-total-count']);
				this.gridData = res.data;
			})
		},
		handleCurrentChange(val) {
			this.pagination.currentPage = val;
		},
		categoryEdit(row) {
			this.$router.push({ path: '/categories/' + row['_id'] });
		},
		categoryDel(row) {
			this.delConfirm().then(() => {
				doDel(`shopping-malls/${this.shoppingMallId}/categories/${row['_id']}`).then(res => {
					this.confirmSuccess();
					this.pageListGet();
				})
			})
		},
		categoryAdd() {
			this.$router.push({ path: '/categories/add' });
		},
		sortChange(e) {
			console.log(e);

			this.sort = e.prop ? (e.order === 'ascending' ? '' : '-') + e.prop : '';
			this.pageListGet();
		},
		clickStop() {

		}
	},
	components: {
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

  // margin: 10px;
  // min-height: 300px;
  // background: #fff;
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
