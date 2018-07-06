<template>
	<div class="contain">
		<el-collapse class="order" v-model="activeNames">
			<el-collapse-item :title="$t('ORDER_STATUS')" name="1">
				<div class="card">
					<h4>{{$t('ORDER_STATUS')}}:{{order.status}}</h4>
					<h4>{{$t('ORDER_FULFILLMENT_STATUS')}}:{{order.shippingStatus}}</h4>
					<div class="product">
						<table width="100%">
							<tr class="productList" v-for="(item,i) in order.items" :key="i">
								<td width>
									<img :src="item.image.url" alt="">
								</td>
								<td>
									<div style="vertical-align:middle;">
										<div>{{item.name[editlang]||item.name.en+'(en)'}}</div>
										<div v-if="item.optionName.en">{{item.optionName[editlang]||item.optionName.en+'(en)'}}</div>
									</div>

								</td>
								<td>{{item.price|yuan}}</td>
								<td>× {{item.quantity}}</td>
								<td style="text-align:right;">{{item.price*item.quantity|yuan}}</td>
							</tr>
							<tbody style="text-align:right;color: #9e9e9e;">

								<tr>
									<td colspan="4">{{$t('ORDER_DISCOUNT')}}</td>
									<td>{{order.discount|yuan}}</td>
								</tr>
								<tr>
									<td colspan="4">{{$t('ORDER_STROE_CREDIT')}}</td>
									<td>{{order.credit|yuan}}</td>
								</tr>
								<tr>
									<td colspan="4">{{$t('ORDER_TAX')}}</td>
									<td>{{order.taxCost|yuan}}</td>
								</tr>
								<tr>
									<td colspan="4">{{$t('ORDER_SHIPPING_COST')}}</td>
									<td>{{order.shippingCost|yuan}}</td>
								</tr>
								<tr style="border-bottom: 1px solid rgba(0, 0, 0, 0.12);">
									<td colspan="4" style="color:black;">{{$t('ORDER_TOTAL')}}</td>
									<td>{{order.totalCost|yuan}}</td>
								</tr>
								<tr>
									<td colspan="4" style="color:black;">{{$t('ORDER_PAID_BY_CUSTOMER')}}</td>
									<td>{{order.totalPaid|yuan}}</td>
								</tr>
							</tbody>

						</table>

					</div>
					<div class="row">
						<span class="left">{{$t('ORDER_REWARD')}}</span>
					</div>
					<!-- <div class="row">
						<span class="left">支付被接受:</span>
						<el-button class="right" size="medium" type="danger">退款</el-button>

					</div>
					<div class="row">
						<span class="left">物流</span>
						<el-button class="right" size="medium" type="primary">订单发货</el-button>

					</div> -->
				</div>
			</el-collapse-item>
			<el-collapse-item :title="$t('ORDER_SHIPPING_TYPE')" name="2">
				<div v-if="order.customer" class="card">
					<table class="shipping" width="80%">
						<tr>
							<td>{{$t('ORDER_SHIPPING_TYPE')}}</td>
							<td>{{order.shippingType}}</td>
						</tr>
						<tr>
							<td>{{$t('ORDER_RECIPIENT')}}</td>
							<td>
								<div>
									<div>{{order.customer.name}}</div>
									<div>{{order.customer.mobilePhone}}</div>
								</div>
							</td>
						</tr>
						<tr>
							<td>{{$t('ORDER_SHIPPING_ADDRESS')}}</td>
							<td>
								<div>
									<div>{{order.shippingAddress.fullAddress.zh}}</div>
									<div>{{order.shippingAddress.fullAddress.en}}</div>
								</div>
							</td>
						</tr>
						<tr>
							<td>{{$t('ORDER_NOTE')}}</td>
							<td>{{order.note}}</td>
						</tr>
					</table>
				</div>
			</el-collapse-item>
			<el-collapse-item :title="$t('ORDER_CUSTOMER_INFORMATION')" name="3">
				<div v-if="order.customer" class="card">
					<table class="customer" width="80%">
						<tr>
							<td>{{$t('ORDER_NAME')}}</td>
							<td>{{order.customer.name}}</td>
						</tr>
						<tr>
							<td>{{$t('ORDER_MOBILE_PHONE')}}</td>
							<td>{{order.customer.mobilePhone}}</td>
						</tr>
						<tr>
							<td>{{$t('ORDER_EMAIL')}}</td>
							<td>{{order.customer.email}}</td>
						</tr>
						<tr>
							<td>{{$t('ORDER_SOURCE')}}</td>
							<td>order</td>
						</tr>
						<tr>
							<td>{{$t('ORDER_NOTE')}}</td>
							<td></td>
						</tr>
					</table>
					<!-- <div style="padding:10px;">
						<el-button size="medium" @click="noteEdit" type="primary">编辑备注</el-button>

					</div> -->
					<div style="padding:10px;">
						<el-button size="medium" @click="orderViewByCustom(order.customer._id)" type="primary">{{$t('ORDER_BROWSE_ORDERS')}}</el-button>

					</div>
					<img class="avatar" :src="order.customer.image.url" alt="">
				</div>

			</el-collapse-item>
			<!-- <el-collapse-item title="支付状态" name="4">
				<table class="paymentStatus" width="100%">
					<tr>
						<td>
							<h4>支付方式</h4>
							<h3>{{order.paymentType}}</h3>
						</td>
						<td>
							<h4>状态</h4>
							<h3>{{order.paymentStatus}}</h3>
						</td>
					</tr>
				</table>

				<div class="card" v-if="order.paymentType">

					<el-table :data="[order]">
						<el-table-column v-for="(item,index) in showData" :key="index" :prop="item.prop" :label="$t(item.label)">
							<template slot-scope="scope">
								<div>
									<img v-if="item.type ==='image'" :src="scope.row|deepGet(item.prop)" alt="" style="width: 50px;height: 50px">
									<span v-if="item.type ==='string'">{{_(scope.row,item.prop)}}</span>
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
								</div>
							</template>
						</el-table-column>
					</el-table>
				</div>
				<div>

				</div>
			</el-collapse-item> -->
		</el-collapse>
	</div>
</template>

<script>
import { doPost, doGet, doPatch } from '@/api/api'

export default {
	mounted() {
		this.orderGet(this.$route.params.id);

	},
	data() {
		return {
			activeNames: ['1', '2', '3'],
			gridData: [],
			showData: [
				{ prop: 'paidAt', label: '交易日期', width: 50, type: 'string' },
				{ prop: 'type', label: '类型', width: 50, type: 'string' },
				{ prop: 'totalPaid', label: '金额', width: 50, type: 'price' },
				{ prop: 'customer.name', label: '客户', width: 50, type: 'string' },
				{ prop: 'paymentType', label: '支付方式', width: 50, type: 'string' },
				{ prop: 'paidAt', label: '交易编号', width: 50, type: 'string' },
			],
			order: {}
		}
	},
	methods: {

		orderGet(orderId) {
			this.gridData = [];
			doGet(`shopping-malls/${this.shoppingMallId}/orders/${orderId}`).then(res => {
				console.log(res);
				this.gridData.push(res.data);
				this.order = res.data;
				this.$store.commit('SET_BREAD', this.order.refId)

				// this.logo = this._(res.data, 'logo.url') ? this._(res.data, 'logo.url') : this.logo;

				// this.storeName = res.data.name;
				// this.$store.commit('SET_BREAD', res.data.name['en'])
			})
		},
		noteEdit() {
			this.$prompt('请输入备注', '备注', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
			}).then(({ value }) => {
				this.$message({
					type: 'success',
					message: '你的备注是: ' + value
				});
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '取消输入'
				});
			});
		},
		orderViewByCustom(id) {
			this.$router.push({ path: '/orders?customer=' + id })
		}
	}
}
</script>



<style lang="scss" scoped>
.contain {
  min-height: 300px;
  background: #fff;
  padding: 10px;
  color: rgba(0, 0, 0, 0.87);
  .order {
    .card {
      position: relative;
      padding: 20px;
      // background: #aaa;
      // border: 1px solid black;
      h4 {
        margin-bottom: 10px;
      }

      .row {
        padding: 16px 0;
        overflow: hidden;
        border-bottom: 1px solid rgba(0, 0, 0, 0.12);
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .product {
        .productList {
          height: 65px;
        }
        tr {
          box-sizing: border-box;
          td {
            vertical-align: middle;
          }
          td:nth-child(1) {
            padding: 5px 10px;
            vertical-align: middle;

            img {
              height: 50px;
              width: auto;
            }
          }
        }
        border-bottom: 1px solid rgba(0, 0, 0, 0.12);
      }
      .shipping {
        tr {
          td {
            height: 20px;
            padding: 10px 0;
            // border: 1px solid black;
          }
          td:nth-child(1) {
            width: 30%;
          }
        }
      }
      .customer {
        tr {
          td {
            height: 20px;
            padding: 10px 0;
          }
          td:nth-child(1) {
            width: 30%;
          }
        }
      }
      .avatar {
        position: absolute;
        width: 20%;
        right: 20px;
        top: 20px;
      }
    }
    .paymentStatus {
      padding: 20px;
      h3 {
        text-transform: uppercase;
        font-size: 20px;
        font-weight: 500;
        letter-spacing: 0.005em;
      }
    }
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


<style lang="scss">
.order {
  .el-collapse-item__header {
    font-size: 16px;
  }
}
</style>