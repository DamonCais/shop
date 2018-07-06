<template>
	<div class="contain">
		<!-- 表格 -->
		<el-button type="primary" @click="pageAdd">{{$t('PAGE_ADDPAGE')}}</el-button>
		<el-table @sort-change="sortChange" stripe border :data="gridData" style="width: 100%">

			<el-table-column :label="$t('PAGE_PAGE_TITLE')">
				<template slot-scope="scope">
					<div @click="pageEdit(scope.row)" style="cursor: pointer;">
						<span v-if="_(scope.row,'pageTitle.'+editlang)">
							{{_(scope.row,'pageTitle.'+editlang)}}
						</span>
						<span style="color:#aaa;" v-else>
							{{_(scope.row,'pageTitle.en')}}
							<i style="color:#000;text-style:none;">(en)</i>
						</span>
					</div>
				</template>
			</el-table-column>

			<el-table-column v-for="(item,index) in showData" :key="index" :prop="item.prop" :sortable="item.sortable" :label="$t(item.label)">
				<template slot-scope="scope">
					<div>
						<img v-if="item.type ==='image'" :src="scope.row|deepGet(item.prop)" alt="" style="width: 50px;height: 50px">
						<span v-if="item.type ==='string'">{{scope.row|deepGet(item.prop)}}</span>
						<span v-if="item.type ==='time'">{{scope.row|deepGet(item.prop)|_formatTime}}</span>
						<span v-if="item.type ==='price'">{{'￥'+scope.row[item.prop]/100}}</span>
						<span v-if="item.type ==='lang'">
							<span v-if="_(scope.row,item.prop+'.'+editlang)">
								{{_(scope.row,item.prop+'.'+editlang)}}
							</span>
							<span style="color:#aaa;" v-else>
								{{_(scope.row,item.prop+'.en')}}
								<i style="color:#000;text-style:none;">(en)</i>
							</span>
						</span>
						<!-- <el-button v-if="item.type ==='button'" @click="toUrl(item.url + scope.row._id)">{{item.prop}}</el-button> -->
					</div>
				</template>
			</el-table-column>
			<el-table-column fixed="right" :label="$t('PAGE_OPERATE')" width="100">
				<template slot-scope="scope">
					<el-button @click="pageEdit(scope.row)" type="text" size="small">{{$t('PAGE_EDIT')}}</el-button>
					<el-button @click="pageDel(scope.row)" type="text" size="small">{{$t('PAGE_DELETE')}}</el-button>
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
import { doPost, doGet, doDel } from '@/api/api'
import { formatTime } from '@/utils/index'
export default {
	mounted() {
		this.pageListGet();
	},
	data() {
		return {
			gridData: [],
			showData: [
				{ prop: 'createdAt', label: 'PAGE_CREATED_AT', width: 120, type: 'time' },
				{ prop: 'sortIndex', label: 'sortIndex', width: 120, type: 'string', sortable: 'custom' },
				{ prop: 'status', label: 'PAGE_STATUS', width: 120, type: 'string' },
			],
			pagination: {
				currentPage: 1,
				total: 0,
			},
			sort: '',
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
		}
	},
	filters: {
		// _formatTime(val) {
		// 	return formatTime(val);
		// }
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

