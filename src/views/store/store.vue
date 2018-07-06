<template>
	<div class="contain">
		<div class="row">
			<img class="logo" :src="logo" alt="">
			<h5 class="title">

				{{$t('STORE_NAME')}} ：{{storeName[editlang]}}
			</h5>
			<!-- <el-button @click="productAdd" type="success">Add Product</el-button> -->
			<div class="clearfix"></div>
		</div>

		<el-table stripe border :data="gridData" style="width: 100%">
			<el-table-column :label="$t('STORE_PRODUCT_LIST')">
				<el-table-column v-for="(item,index) in showData" :key="index" :prop="item.prop" :sortable="item.sortable" :label="$t(item.label)">
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
							<!-- <el-button v-if="item.type ==='button'" @click="toUrl(item.url + scope.row._id)">{{item.prop}}</el-button> -->
						</div>
					</template>
				</el-table-column>
				<el-table-column :label="$t('STORE_PRODUCT_PRICE')" width="150">
					<template slot-scope="scope">
						<span>{{'￥'+scope.row.price/100}}</span>
						<!-- <span v-if="!scope.row.productOptions.length">{{'￥'+scope.row.price/100}}</span>
						<div v-else>
							<p v-for="op in scope.row.productOptions" :key="op._id">
								{{op.name.en}} {{'￥'+op.price/100}}
							</p>
						</div> -->
					</template>
				</el-table-column>
				<!-- <el-table-column fixed="right" label="操作" width="100">
					<template slot-scope="scope">
						<el-button @click="productDel(scope.row)" type="text" size="small">删除</el-button>
					</template>
				</el-table-column> -->

			</el-table-column>
		</el-table>
		<!-- 分页 -->
		<el-pagination class="pagination" @current-change="handleCurrentChange" layout="prev, pager, next" :current-page.sync="pagination.currentPage" :total="pagination.total">
		</el-pagination>
		<div class="clearfix"></div>
	</div>
</template>

<script>
import { doPost, doGet, doPatch } from '@/api/api'
export default {
	mounted() {
		this.storeGet(this.$route.params.id);
		this.storeProductsGet(this.$route.params.id);
	},
	data() {
		return {
			logo: 'https://s3.cn-north-1.amazonaws.com.cn/guzzu-cn-assets-1/images/7eae2145-a4c2-49d5-b179-2e09596b9252-medium.jpg',
			storeName: { zh: '', en: 'test store' },
			gridData: [],
			showData: [
				{ prop: 'image.url', label: 'STORE_PRODUCT_IMAGE', width: 120, type: 'image' },
				{ prop: 'name', label: 'STORE_PRODUCT_NAME', width: 120, type: 'lang' },
				// { prop: 'price', label: 'STORE_PRODUCT_PRICE', sortable: true, width: 120, type: 'price' },
			],
			pagination: {
				currentPage: 1,
				total: 50,
			}
		}
	},
	methods: {
		storeGet(storeId) {
			doGet(`shopping-malls/${this.shoppingMallId}/stores/${storeId}`).then(res => {
				this.logo = this._(res.data, 'logo.url') ? this._(res.data, 'logo.url') : this.logo;
				this.storeName = res.data.name;
				this.$store.commit('SET_BREAD', res.data.name['en'])
			})
		},
		storeProductsGet(storeId) {
			this.gridData = [];
			doGet(`shopping-malls/${this.shoppingMallId}/stores/${storeId}/products`, { p: this.pagination.currentPage - 1 }).then(res => {
				console.log(res);
				this.pagination.total = parseInt(res.headers['x-total-count']);
				this.gridData = res.data;
			})
		},
		handleCurrentChange(val) {
			this.pagination.currentPage = val;
			this.storeProductsGet(this.$route.params.id);
		},
		productDel(row) {
			console.log(row);
		},
		productAdd() {

		}
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
  .row {
    margin-bottom: 20px;
    .logo {
      width: 200px;
      height: 200px;
      float: left;
      margin-right: 100px;
    }
    .title {
      padding: 20px;
      line-height: 30px;

      font-size: 20px;
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
