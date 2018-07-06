<template>
	<div class="contain">
		<el-card style="margin-bottom:10px;">
			<div slot="header" class="clearfix">
				<span>{{$t('ORDERS_GROSS')}}</span>
			</div>
			<div class="cardItem">
				<div>{{$t('ORDERS_GROSS')}}: ￥{{stats.gross/100}}</div>
				<div>{{$t('ORDERS_SHOPPING_MALL_PERCENT')}}: {{stats.shoppingMallPercent}}%</div>
				<div>{{$t('ORDERS_SHOPPING_MALL_AMOUNT')}}: ￥{{stats.shoppingMallAmount/100}}</div>
			</div>

		</el-card>
		<div ref="table">
			<my-table @filterChange="filterChange" @sortChange="sortChange" :gridData="gridData" @rowClick="orderView" class="rowClick" :showData="showData">

				<el-table-column :label="$t('ORDERS_OPERATE')" min-width="50">
					<template slot-scope="scope">
						<el-button @click="orderView(scope.row)" type="text" size="small">{{$t('ORDERS_VIEW')}}</el-button>
					</template>
				</el-table-column>
			</my-table>
		</div>

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

		this.orderListGet();
		this.statsGet();
	},
	data() {
		return {
			stats: {},
			gridData: [],
			showData: [

				{ prop: 'refId', label: 'ORDERS_REF_ID', width: 80, type: 'string', sortable: 'custom', clickAble: false },
				{ prop: 'createdAt', label: 'ORDERS_CREATED_AT', sortable: 'custom', type: 'time' },

				{ prop: 'totalCost', label: 'ORDERS_TOTAL_COST', width: 80, type: 'price', sortable: 'custom' },
				{ prop: 'status', label: 'ORDERS_STATUS', type: 'string', sortable: 'custom' },

				{
					prop: 'paymentStatus', label: 'ORDERS_PAYMENT_STATUS', type: 'string', sortable: 'custom', filterAble: true,
					filters: [{ text: this.$t('ORDERS_PAYMENT_EXPIRED'), value: 'expired' }, { text: this.$t('ORDERS_PAYMENT_PAID'), value: 'paid' }]
				},

				{ prop: 'shippingStatus', label: 'ORDERS_SHIPPING_STATUS', type: 'string', sortable: 'custom' },
				{ prop: 'shippingType', label: 'ORDERS_SHIPPING_TYPE', width: 150, type: 'string', sortable: 'custom' },

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
			doGet(`/shopping-malls/${this.shoppingMallId}/orders`, { p: this.pagination.currentPage - 1, sort: this.sort, q: JSON.stringify(Object.assign({}, this.q, this.$route.query)) }).then(res => {
				this.pagination.total = parseInt(res.headers['x-total-count']);
				this.gridData = res.data;
			})
		},
		handleCurrentChange(val) {
			this.pagination.currentPage = val;
			this.orderListGet();
		},
		sortChange(e) {
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
		statsGet() {
			doGet(`/shopping-malls/${this.shoppingMallId}/orders/getStats`, ).then(res => {
				this.stats = res.data;
			})
		}
	},
	components: {
		myTable
	}
}
</script>

<style lang="scss" scoped>
.contain {
  min-height: 300px;
  background: #fff;
  padding: 10px;
  .cardItem {
    div {
      margin-bottom: 10px;
    }
  }
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