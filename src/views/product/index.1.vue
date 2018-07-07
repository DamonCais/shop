<template>
	<div class="contain">
		<!-- 表格 -->
		<el-button type="primary" @click="storeAdd">{{$t('STORE_ADDSTORE')}}</el-button>
		<el-table @sort-change="sortChange" stripe border :data="gridData" style="width: 100%">
			<div v-for="(item,index) in showData" :key="index">
				<el-table-column v-if="item.type!=='btn'" :prop="item.prop" :width="item.width" :sortable="item.sortable" :label="$t(item.label)">
					<template slot-scope="scope">
						<div>
							<img v-if="item.type ==='image'" :src="scope.row|deepGet(item.prop)" alt="" style="width: 50px;height: 50px">
							<span v-if="item.type ==='string'">{{scope.row|deepGet(item.prop)}}</span>
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
				<el-table-column v-else :prop="item.prop" :width="item.width" :sortable="item.sortable" :label="$t(item.label)">
					<template slot-scope="scope">
						<div @click="storeView(scope.row)" style="cursor: pointer;">
							<span v-if="_(scope.row,item.prop+'.'+editlang)">
								{{_(scope.row,item.prop+'.'+editlang)}}
							</span>
							<span style="color:#aaa;" v-else>
								{{_(scope.row,item.prop+'.en')}}
								<i style="color:#000;text-style:none;">(en)</i>
							</span>

						</div>
					</template>
				</el-table-column>
			</div>

			<el-table-column fixed="right" :label="$t('STORE_OPERATE')">
				<template slot-scope="scope">
					<el-button @click="storeView(scope.row)" type="text" size="small">{{$t('STORE_VIEW')}}</el-button>
					<el-button @click="storeDel(scope.row)" type="text" size="small">{{$t('STORE_DELETE')}}</el-button>
					<!-- <el-button type="text" size="small">编辑</el-button> -->
				</template>
			</el-table-column>
		</el-table>
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
export default {
	mounted() {
		this.storeListGet();
	},
	data() {
		return {
			gridData: [],
			showData: [
				{ prop: 'sortIndex', label: 'sortIndex', type: 'string', sortable: 'custom' },

				{ prop: 'logo.url', label: 'logo', width: 80, type: 'image' },
				{ prop: 'name', label: 'name', type: 'btn' },
				// { prop: 'products.length', label: 'quantity', width: 120, type: 'string' },
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
		storeListGet() {
			this.gridData = [];
			doGet(`/shopping-malls/${this.shoppingMallId}/stores`, { p: this.pagination.currentPage - 1, sort: this.sort }).then(res => {
				console.log(res);
				this.pagination.total = parseInt(res.headers['x-total-count']);
				this.gridData = res.data;
			})
		},
		handleCurrentChange(val) {
			this.pagination.currentPage = val;
			this.storeListGet();
		},
		storeView(row) {
			this.$router.push({ path: '/stores/' + row['_id'] });
		},
		storeDel(row) {
			this.delConfirm().then(() => {
				doDel(`shopping-malls/${this.shoppingMallId}/stores/${row['_id']}`).then(res => {
					this.confirmSuccess();
					this.storeListGet();
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
				this.storeListGet();
			})
			this.storeDialog = false;
		},
		sortChange(e) {
			console.log(e);

			this.sort = e.prop ? (e.order === 'ascending' ? '' : '-') + e.prop : '';
			this.storeListGet();
		}
	},
	components: {
		storesel,
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
