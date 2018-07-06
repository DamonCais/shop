<template>
	<div class="contain">
		<el-table @filter-change="filterChange" @sort-change="sortChange" stripe border :data="gridData" style="width:100%">
			<div v-for="(item,index) in showData" :prop="item.prop" :key="index">

				<el-table-column :column-key="item.prop" :filters="item.filters" :prop="item.prop" :width="item.width" :sortable="item.sortable" :label="$t(item.label)">
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

			</div>

			<!-- paid -->

			<el-table-column column-key="paymentStatus" prop="paymentStatus" :filters="[{text: 'expired', value: 'expired'},{text: 'paid', value: 'paid'},]" label="paymentStatus" width="120">
				<template slot-scope="scope">
					<span>{{scope.row|deepGet('paymentStatus')}}</span>
				</template>
			</el-table-column>
			<!-- 查看详情 -->
			<el-table-column fixed="right " label="查看详情" width="120 ">
				<template slot-scope="scope ">
					<el-button @click="orderView(scope.row) " type="text " size="small ">查看详情</el-button>
					<!-- <el-button type="text " size="small ">编辑</el-button> -->
				</template>
			</el-table-column>

		</el-table>
		<!-- 分页 -->
		<el-pagination class="pagination " @current-change="handleCurrentChange " layout="prev, pager, next " :current-page.sync="pagination.currentPage " :total="pagination.total ">
		</el-pagination>
		<div class="clearfix "></div>

	</div>
</template>

<script>
import { doPost, doGet, doDel } from '@/api/api'

export default {
	mounted() {
		this.orderListGet();
	},
	data() {
		return {
			gridData: [],
			showData: [
				{ prop: 'refId', label: 'refId', width: 120, type: 'string', sortable: 'custom' },
				{ prop: 'totalCost', label: 'totalCost', width: 120, type: 'price', sortable: 'custom' },
				{ prop: 'status', label: 'status', width: 120, type: 'string', sortable: 'custom' },

				{					prop: 'paymentStatus', label: 'paymentStatus', width: 120, type: 'string', sortable: 'custom', filterAble: true, filters: [
						{ text: 'expired', value: 'expired' }, { text: 'paid', value: 'paid' }
					]				},

				{ prop: 'shippingStatus', label: 'shippingStatus', width: 120, type: 'string', sortable: 'custom' },
				{ prop: 'shippingType', label: 'shippingType', width: 120, type: 'string', sortable: 'custom' },

			],
			pagination: {
				currentPage: 1,
				total: 50,
			},
			sort: '',
			q: {}

		}
	},
	methods: {
		orderListGet() {
			this.gridData = [];
			doGet(`/shopping-malls/${this.shoppingMallId}/orders`, { p: this.pagination.currentPage - 1, sort: this.sort, q: JSON.stringify(this.q) }).then(res => {
				console.log(res);
				this.pagination.total = parseInt(res.headers['x-total-count']);
				this.gridData = res.data;
			})
		},
		handleCurrentChange(val) {
			this.pagination.currentPage = val;
			this.orderListGet();
		},
		sortChange(e) {
			console.log(e);
			this.sort = e.prop ? (e.order === 'ascending' ? '' : '-') + e.prop : '';
			this.orderListGet();
		},

		filterChange(e) {

			for (var key in e) {
				if (e[key].length === 0) {
					delete e[key];
				}
			}
			this.q = e;
			this.orderListGet();
		},
		orderView(row) {
			this.$router.push({ path: '/orders/' + row['_id'] });
		},

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