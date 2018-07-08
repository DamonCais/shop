<template>
	<div class="contain">
		<!-- <h6 class="lang">
			<span :class="{'active':editlang==='en'}" @click="setlang('en')">EN</span>
			<span :class="{'active':editlang==='zh'}" @click="setlang('zh')">中</span>
		</h6> -->
		<div class="row">
			<div @click="getImg" class="logo" :style="'background-image:url('+categoryData.image.url+')'">
				<h5>{{$t('CATEGORY_IMAGE_CHANGE')}}</h5>
			</div>
			<!-- 表单 -->
			<el-form ref="form" class="form" label-width="80px">
				<el-form-item :label="$t('CATEGORY_NAME')">
					<el-input :placeholder="editlang==='en'?'please input':'请输入分组名称'" v-model="categoryData.name"></el-input>
				</el-form-item>
				<el-form-item :label="$t('CATEGORY_DESCRIPTION')">
					<el-input :placeholder="editlang==='en'?'please input':'请输入分组描述'" v-model="categoryData.description"></el-input>
				</el-form-item>
				<el-form-item :label="$t('CATEGORY_META_DESCRIPTION')">
					<el-input :placeholder="editlang==='en'?'please input':'请输入页面描述'" v-model="categoryData.metaDescription"></el-input>
				</el-form-item>
				<el-form-item :label="$t('CATEGORY_WECHAT_SHARE')">
					<el-input :placeholder="editlang==='en'?'please input':'请输入微信分享'" v-model="categoryData.weixinShareTitle"></el-input>
				</el-form-item>
				<el-form-item :label="$t('CATEGORY_WECHAT_DESCRIPTION')">
					<el-input :placeholder="editlang==='en'?'please input':'请输入微信描述'" v-model="categoryData.weixinShareDescription"></el-input>
				</el-form-item>
				<el-form-item :label="$t('CATEGORY_TABINDEX')">
					<el-input-number v-model="categoryData.sortIndex" :min="0" :max="10"></el-input-number>
				</el-form-item>
			</el-form>

			<div class="clearfix"></div>
		</div>

		<!-- 表格 -->
		<el-table stripe :data="gridData" border style="width: 100%">
			<el-table-column v-for="(item,index) in showData" :key="index" :prop="item.prop" :sortable="item.sortable" :label="$t(item.label)">
				<template slot-scope="scope">
					<div>
						<img v-if="item.type ==='image'" :src="_(scope.row,item.prop)" alt="" style="width: 50px;height: 50px">
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
						<div v-if="item.type ==='multi'">
							<div v-if="scope.row[item.props].length">
								<p v-for="op in scope.row[item.props]" :key="op._id">
									{{op[item.prop]}}
								</p>
							</div>
							<div v-else>
								{{_(scope.row,item.prop)}}
							</div>

						</div>
						<!-- <el-button v-if="item.type ==='button'" @click="toUrl(item.url + scope.row._id)">{{item.prop}}</el-button> -->
					</div>
				</template>
			</el-table-column>
			<el-table-column label="商品价格" prop="price" sortable width="120">
				<template slot-scope="scope">
					<span v-if="!scope.row.productOptions.length">{{'￥'+scope.row.price/100}}</span>
					<div v-else>
						<p v-for="op in scope.row.productOptions" :key="op._id">
							{{op.name.en}} {{'￥'+op.price/100}}
						</p>
					</div>
				</template>
			</el-table-column>

			<!-- <el-table-column label="商品规格" width="150">
				<template slot-scope="scope">
					<span v-if="!scope.row.productOptions.length">
						{{_(scope.row,'name.'+editlang)?_(scope.row,'name.'+editlang):_(scope.row,'name.en')+'(en)'}}
					</span>
					<div v-else>
						<p v-for="op in scope.row.productOptions" :key="op._id">
							{{op.name.en}}
						</p>
					</div>
				</template>
			</el-table-column> -->

			<el-table-column :label="$t('CATEGORY_PRODUCT_QUANTITY')" sortable width="120">
				<template slot-scope="scope">
					<span v-if="!scope.row.productOptions.length">{{scope.row.inventoryPolicy==='limited'?scope.row.maxQuantity:'unlimited'}}</span>
					<div v-else>
						<p v-for="op in scope.row.productOptions" :key="op._id">
							{{op.inventoryPolicy==='limited'?op.maxQuantity:'unlimited'}}
						</p>
					</div>
				</template>
			</el-table-column>

			<el-table-column fixed="right" :label="$t('CATEGORY_OPERATE')" width="100">
				<template slot-scope="scope">
					<el-button @click="productDel(scope.$index)" type="text" size="small">{{$t('CATEGORY_DELETE')}}</el-button>
					<!-- <el-button type="text" size="small">删除</el-button> -->
				</template>
			</el-table-column>
		</el-table>

		<el-button style="margin:10px;" @click="getProducts">{{$t('CATEGORY_PRODUCT_ADD')}}</el-button>
		<!-- 分页 -->
		<!-- <el-pagination class="pagination" @current-change="handleCurrentChange" layout="prev, pager, next" :current-page.sync="pagination.currentPage" :total="pagination.total">
		</el-pagination> -->
		<div class="clearfix"></div>

		<!-- 图标选择框 -->
		<imgsel :pagination="imgPagination" @pageChange="imgpageChange" @imgsel="imgsel" :imgdata="imgdata" v-model="imgDialog" />
		<!--商品选择  -->
		<productsel ref="productsel" title="选择商品" :pagination="productPagination" :storesData="storesData" @sortChange="productSortChange" @productsel="productsel" v-model="productDialog" :multi="true" :showData="productShowData" :gridData="productGridData" />

		<!-- 底部按钮 -->
		<foot :uploadType="uploadType" @upload="upload" />
	</div>
</template>

<script>
import imgsel from '@/core/imgsel'
import productsel from '@/core/productsel'
import foot from './foot'

import { doPost, doGet, doPatch } from '@/api/api'
export default {
	mounted() {
		console.log('mounted');
		this.shoppingmallStoresGet();
		if (this.$route.params.id === 'add') {
			this.uploadType = 'add';
			return;
		}
		this.uploadType = 'update'

		this.categoryGet();
		this.categoryProductsGet();
	},
	data() {
		return {
			categoryData: {
				image: {},
				name: { zh: '', en: 'test category' },
				description: { zh: '', en: '' },
				metaDescription: { zh: '', en: '' },
				weixinShareTitle: { zh: '', en: '' },
				weixinShareDescription: { zh: '', en: '' },
				products: [],
				sortIndex: 0
			},
			// productListData
			gridData: [],
			showData: [
				{ prop: 'image.url', label: 'CATEGORY_PRODUCT_IMAGE', width: 120, type: 'image' },
				{ prop: 'name', label: 'CATEGORY_PRODUCT_NAME', width: 120, type: 'lang', sortable: true },
				// { prop: 'price', label: 'CATEGORY_PRODUCT_PRICE', width: 120, type: 'string' },
				// { prop: 'price', props: 'productOptions', label: 'CATEGORY_PRODUCT_PRICE', width: 80, type: 'multi' },
			],
			pagination: {
				currentPage: 1,
				total: 0,
			},
			// imgSelData
			imgDialog: false,
			imgdata: [],
			imgPagination: {
				currentPage: 1,
				total: 0,
			},
			// productSelData
			productDialog: false,
			productGridData: [],
			productShowData: [
				{ prop: 'image.url', label: 'image', width: 120, type: 'image' },
				{ prop: 'name', label: 'name', width: 120, type: 'lang' },
				{ prop: 'price', label: 'price', width: 120, type: 'price' },
			],
			storesData: {
				storesList: [],
				storeId: '',
			},
			productPagination: {
				currentPage: 1,
				total: 0,
			},
			//////////////////////////////////////////
			uploadType: 'add'

		}
	},
	methods: {
		upLoadAdd() {
			doPost(`shopping-malls/${this.shoppingMallId}/categories`, this.categoryData).then(res => {
				if (res.status === 200) {
					this.$message({
						message: 'save success',
						type: 'success'
					})
				}
				this.$router.replace({ path: '/categories/' + res.data['_id'] })
				this.uploadType = 'update'
				this.categoryGet();
				this.categoryProductsGet();
			})
		},
		upLoadUpdate() {
			doPatch(`shopping-malls/${this.shoppingMallId}/categories/${this.$route.params.id}`, this.categoryData).then(res => {
				if (res.status === 200) {
					this.$message({
						message: 'update success',
						type: 'success'
					})
				}
				this.categoryProductsGet();
			})
		},
		upload() {
			delete this.categoryData['__v'];
			if (this.uploadType === 'add') {
				this.upLoadAdd();
			} else {
				this.upLoadUpdate();
			}
		},
		categoryGet() {
			doGet(`shopping-malls/${this.shoppingMallId}/categories/${this.$route.params.id}`).then(res => {
				console.log(res.data);
				// this.categoryData = res.data;
				Object.assign(this.categoryData, res.data);
				this.$store.commit('SET_BREAD', this.categoryData.name['en'])

			})
		},
		categoryProductsGet() {
			this.gridData = [];
			doGet(`shopping-malls/${this.shoppingMallId}/categories/${this.$route.params.id}/products`, { p: this.pagination.currentPage - 1 }).then(res => {
				console.log(res);
				this.pagination.total = parseInt(res.headers['x-total-count']);
				this.gridData = res.data;
			})
		},
		handleCurrentChange(val) {
			this.pagination.currentPage = val;
		},

		imgsel(val) {
			if (val === -1) {
				return;
			}
			this.categoryData.image = this.imgdata[val].image
			this.imgDialog = false;

		},
		getImg() {
			this.imgdata = [];
			doGet(`shopping-malls/${this.shoppingMallId}/medias`, { p: this.imgPagination.currentPage - 1 }).then(res => {
				console.log(res);
				this.imgPagination.total = parseInt(res.headers['x-total-count']);
				this.imgdata = res.data;
				this.imgDialog = true;
			})
		},
		imgpageChange(val) {
			this.imgPagination.currentPage = val;
			this.getImg();
		},
		productDel(index) {
			this.categoryData.products.splice(index, 1);
			this.upload();
		},
		productsel(products) {
			console.log(products)
			this.productDialog = false;
			products.forEach(element => {
				this.categoryData.products.push(element._id);
			});
			this.upload();
		},
		getProducts() {
			this.productGridData = [];
			doGet(`shopping-malls/${this.shoppingMallId}/stores/${this.storesData['storeId']}/products`, { p: this.productPagination.currentPage - 1 }).then(res => {
				this.productPagination.total = parseInt(res.headers['x-total-count']);
				this.productGridData = res.data;
				this.productDialog = true;
				setTimeout(() => {
					this.$refs.productsel.toggleSelection();
				}, 20);
			})
		},
		productSortChange(val) {
			this.productPagination.currentPage = val;
			this.getProducts();
		},

		// 获取storesIds
		shoppingmallStoresGet() {
			doGet(`shopping-malls/${this.shoppingMallId}/stores`, { p: 0 }).then(res => {
				this.storesData = {
					storesList: res.data,
					storeId: res.data[0]['_id'],
				}
			})
		},
		setlang(lang) {
			this.$store.dispatch('setEditlang', lang)
		}
	},
	components: {
		imgsel,
		productsel,
		foot
	}
}
</script>

<style lang="scss" scoped>
.contain {
  min-height: 300px;
  background: #fff;
  // width: 1000px;
  padding: 10px;
  // min-height: 300px;
  // background: #fff;
  // padding: 20px 100px;
  // box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.2);
  position: relative;

  .row {
    margin-bottom: 20px;
    .logo {
      width: 200px;
      height: 200px;
      float: left;
      margin-right: 100px;
      box-sizing: border-box;
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
      position: relative;
      cursor: pointer;
      h5 {
        text-align: center;
        width: 100%;
        background: #666;
        color: #fff;
        position: absolute;
        bottom: 0;
        line-height: 20px;
      }
    }
    .form {
      float: left;
      .el-form-item {
        margin-bottom: 5px;
      }
    }
    .title {
      padding: 20px;
      line-height: 30px;

      font-size: 20px;
    }
  }
  .lang {
    position: absolute;
    right: 0;
    top: 0;
    display: flex;
    border: 1px solid red;
    justify-content: space-around;
    text-align: center;
    span {
      display: block;
      padding: 5px;
      width: 30px;
      cursor: pointer;
    }
    .active {
      background: #3f8;
    }
  }
}
.pagination {
  margin: 5px 0;
  float: right;
  margin-bottom: 50px;
}
.btn {
  margin: 5px 0;
  float: right;
}
.clearfix {
  clear: both;
}
</style>
