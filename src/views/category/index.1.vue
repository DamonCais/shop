<template>
	<div class="contain">
		<!-- 表格 -->
		<el-button type="primary" @click="categoryAdd">{{$t('CATEGORY_ADDCATEGORY')}}</el-button>
		<el-table @sort-change="sortChange" stripe border :data="gridData" style="width: 100%">
			<div v-for="(item,index) in showData" :key="index">
				<el-table-column :width="item.width" :prop="item.prop" :sortable="item.sortable" :label="$t(item.label)">
					<template slot-scope="scope">
						<div>
							<img v-if="item.type ==='image'" :src="scope.row|deepGet(item.prop)" alt="" style="width: 50px;height: 50px">
							<span v-if="item.type ==='string'">{{scope.row|deepGet(item.prop)||0}}</span>
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
			</div>

			<!-- 姓名 -->
			<el-table-column sortable="custom" prop="name" :label="$t('CATEGORY_NAME')" min-width="180">
				<template slot-scope="scope">
					<div @click="categoryEdit(scope.row)" style="cursor: pointer;">
						<span v-if="_(scope.row,'name.'+editlang)">
							{{_(scope.row,'name.'+editlang)}}
						</span>
						<span style="color:#aaa;" v-else>
							{{_(scope.row,'name.en')}}
							<i style="color:#000;text-style:none;">(en)</i>
						</span>
					</div>
				</template>
			</el-table-column>
			<!-- 数量 -->
			<el-table-column :sortable="false" prop="products.$size" :label="$t('CATEGORY_QUANTITY')" min-width="120">
				<template slot-scope="scope">
					<span>{{scope.row|deepGet( 'products.length')||0}}</span>

				</template>
			</el-table-column>
			<!-- sortIndex -->
			<el-table-column sortable="custom" prop="sortIndex" :label="$t('CATEGORY_TABINDEX')" min-width="100">
				<template slot-scope="scope">
					<span>{{scope.row.sortIndex}}</span>
				</template>
			</el-table-column>
			<!-- 编辑 -->
			<el-table-column fixed="right" :label="$t('CATEGORY_OPERATE')" width="100">
				<template slot-scope="scope">
					<el-button @click="categoryEdit(scope.row)" type="text" size="small">{{$t('CATEGORY_EDIT')}}</el-button>
					<el-button @click="categoryDel(scope.row)" type="text" size="small">{{$t('CATEGORY_DELETE')}}</el-button>

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
import { doPost, doGet, doDel } from '@/api/api'
export default {
	mounted() {
		this.pageListGet();
	},
	data() {
		return {
			gridData: [],
			showData: [
				{ prop: 'image.url', label: 'CATEGORY_IMAGE', width: 90, type: 'image' },
				// { prop: 'name', label: 'CATEGORY_NAME', width: 180, type: 'lang', sortable: 'custom', sortChange: 'sortChange' },
				// { prop: 'products.length', label: 'CATEGORY_QUANTITY', width: 120, type: 'string', sortable: 'custom', sortChange: 'sortChange' },
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
		}
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
