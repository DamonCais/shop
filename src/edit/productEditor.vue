<template>
	<div>
		<el-form ref="form" class="form" label-width="80px">
			<el-form-item :label="$t('PRODUCT_GROUP_SOURCE')">
				<el-radio-group v-model="block.source">
					<el-radio label="product">{{$t('PRODUCT_GROUP_PRODUCT')}}</el-radio>
					<el-radio label="shoppingMallCategory">{{$t('PRODUCT_GROUP_SHOPPING_MALL_CATEGORY')}}</el-radio>
				</el-radio-group>
			</el-form-item>

			<div v-show="block.source==='product'" class="product">
				<span>{{$t('PRODUCT_GROUP_PRODUCT_SELECT')}}</span>
				<div class="imgs">
					<draggable :options="dragOptions" v-model="block.items">
						<div class="img" v-for="(item,i) in block.items" :key="i" :style="'background-image:url('+_(item,'image.url')+')'" @mouseover="del=i" @mouseout="del=-1">
							<i v-show="del===i" @click="itemDel(i)" class="el-icon-error del"></i>
						</div>
					</draggable>
					<div @click="shoppingmallStoresGet" class="plus">
						<i class="el-icon-plus"></i>
					</div>
				</div>
			</div>
			<div v-show="block.source==='shoppingMallCategory'" class="category">
				<div class="row">
					{{$t('PRODUCT_GROUP_SHOPPING_MALL_CATEGORY')}}:
					<span v-show="shoppingMallCategoryId" class="span">
						{{shoppingMallCategoryId}}
						<i @click="shoppingMallCategoryDel" class="el-icon-close"></i>
					</span>
					<span @click="shoppingMallCategoryGet" style="color:#38f;font-size:12px;cursor:pointer;">{{block.shoppingMallCategory?'修改':'从商品分组中选择'}}</span>
				</div>
				<div class="row">
					{{$t('PRODUCT_GROUP_LIMIT')}}:
					<input v-model="block.limit" type="text">
					<span style="color:#aaa;">{{$t('PRODUCT_GROUP_LESS_THAN')}}50</span>
				</div>

			</div>

			<el-form-item :label="$t('PRODUCT_GROUP_TEMPLATE')">
				<el-radio-group v-model="block.template">
					<el-radio label="single">{{$t('PRODUCT_GROUP_SINGLE')}}</el-radio>
					<el-radio label="double">{{$t('PRODUCT_GROUP_DOUBLE')}}</el-radio>
					<el-radio label="triple">{{$t('PRODUCT_GROUP_TRIPLE')}}</el-radio>
					<el-radio label="onebig">{{$t('PRODUCT_GROUP_ONEBIG')}}</el-radio>
					<el-radio label="list">{{$t('PRODUCT_GROUP_LIST')}}</el-radio>
				</el-radio-group>
			</el-form-item>
			<!-- <el-form-item label="填充方式">
				<el-radio-group v-model="block.fillType">
					<el-radio label="nospace">填充</el-radio>
					<el-radio label="haspace">留白</el-radio>
				</el-radio-group>
			</el-form-item> -->
		</el-form>
		<!--商品选择  -->
		<productsel ref="productsel" :title="dialogTitle" :pagination="pagination" :storesData="storesData" @sortChange="sortChange" @productsel="productsel" v-model="dialogVisible" :multi="multi" :showData="showData" :gridData="gridData" />
		<!-- 商品分组选择 -->

	</div>
</template>

<script>
import draggable from 'vuedraggable'

import productsel from '@/core/productsel'
import { doPost, doGet } from '@/api/api'
export default {
	props: {
		block: {
			type: Object,
		}
	},
	data() {
		return {
			dragOptions: {
				animation: 120,
				scroll: true,
				group: 'sortlist',
				ghostClass: 'ghost-style'
			},
			dialogVisible: false,
			dialogTitle: '选择商品',
			multi: true,
			showData: [],
			productData: [
				{ prop: 'image.url', label: 'image', width: 120, type: 'image' },
				{ prop: 'name.en', label: 'name', width: 120, type: 'string' },
				{ prop: 'price', label: 'price', width: 120, type: 'price' },
			],
			shoppingmallpageData: [
				{ prop: 'pageTitle.en', label: 'pageTitle', width: 120, type: 'string' },
				{ prop: 'createdAt', label: 'createdAt', width: 120, type: 'string' },
				{ prop: 'status', label: 'status', width: 120, type: 'string' },
			],
			shoppingmallcategoryData: [
				{ prop: 'image.url', label: 'image', width: 120, type: 'image' },
				{ prop: 'name.en', label: 'name', width: 120, type: 'string' },
				{ prop: 'products.length', label: 'quantity', width: 120, type: 'string' },
			],
			gridData: [],
			storesData: {
				storesList: [],
				storeId: '',
			},

			pagination: {
				currentPage: 1,
				total: 50,
			},
			shoppingMallCategoryId: this.block.shoppingMallCategory,
			del: -1,
		}
	},
	methods: {
		shoppingMallCategoryDel() {
			delete this.block.shoppingMallCategory
			this.shoppingMallCategoryId = '';
		},
		itemDel(i) {
			this.block.items.splice(i, 1);
		},
		productsel(products) {
			switch (this.block.source) {
				case 'product':
					products.forEach(element => {
						this.block.items.push({
							image: this._(element, 'image'),
							name: element.name,
							price: element.price,
							product: element._id,
						})
					});
					break;
				case 'shoppingMallCategory':
					this.categoryname = products[0]['name']['en']
					this.block.shoppingMallCategory = products[0]['_id'];
					this.shoppingMallCategoryId = this.block.shoppingMallCategory;
					break;
			}
			this.dialogVisible = false;
		},
		productAdd() {
			this.multi = true;
			this.dialogTitle = '选择商品';
			this.gridData = [];
			this.showData = this.productData;
			doGet('/products', { p: this.pagination.currentPage - 1 }).then(res => {
				this.pagination.total = parseInt(res.headers['x-total-count']);
				this.gridData = res.data;
				this.dialogVisible = true;
				setTimeout(() => {
					this.$refs.productsel.toggleSelection();
				}, 20);

			})
		},
		shoppingmallStoreProductGet() {
			this.multi = true;
			this.dialogTitle = '选择商品';
			this.gridData = [];
			this.showData = this.productData;
			doGet(`shopping-malls/${this.shoppingMallId}/stores/${this.storesData['storeId']}/products`, { p: this.pagination.currentPage - 1 }).then(res => {
				this.pagination.total = parseInt(res.headers['x-total-count']);
				this.gridData = res.data;
				this.dialogVisible = true;
				setTimeout(() => {
					this.$refs.productsel.toggleSelection();
				}, 20);
			})
		},
		shoppingmallStoresGet() {
			doGet(`shopping-malls/${this.shoppingMallId}/stores`, { p: 0 }).then(res => {
				this.storesData = {
					storesList: res.data,
					storeId: res.data[0]['_id'],
				}
				this.shoppingmallStoreProductGet();
			})
		},
		shoppingMallCategoryGet() {
			this.multi = false;
			this.dialogTitle = '选择分组';
			this.gridData = [];
			this.showData = this.shoppingmallcategoryData;
			doGet(`shopping-malls/${this.shoppingMallId}/categories`, { p: this.pagination.currentPage - 1 }).then(res => {
				this.pagination.total = parseInt(res.headers['x-total-count']);
				this.gridData = res.data;
				this.dialogVisible = true;
			})
		},
		pageChange(val) {
			this.pagination.currentPage = val;
			this.shoppingmallStoreProductGet();
		},
		storeIdChange(val) {
			this.pagination.currentPage = 1;
			this.shoppingmallStoreProductGet();
		},
		sortChange(page) {
			this.pagination.currentPage = page;
			this.shoppingmallStoreProductGet();
		}
	},
	components: {
		productsel,
		draggable
	},
}
</script>

<style lang="scss" scoped>
.form {
  width: 500px;
  padding: 10px;
  box-sizing: border-box;
  .product {
    min-height: 60px;
    border: 1px solid #999;
    padding: 15px 10px;
    font-size: 14px;
    margin-bottom: 10px;
    display: flex;
    background: #fff;
    span {
      // width:120px;
      padding-top: 3px;
    }
  }
  .category {
    min-height: 80px;
    border: 1px solid #999;
    padding: 10px 10px;
    font-size: 14px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    background: #fff;
    .span {
      // margin-left: 5px;
      vertical-align: bottom;
      // max-width: 90px;
      border-color: rgba(51, 136, 255, 0.3);
      color: rgb(102, 102, 102);
      background: rgb(226, 243, 255);
      font-size: 14px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      display: inline-block;
      padding: 0 0 0 3px;
      position: relative;
      top: 0;
      bottom: 0;
      i {
        cursor: pointer;
      }
    }
    .row {
      line-height: 16px;
      height: 16px;
      input {
        width: 80px;
        height: 10px;
      }
    }
  }
  .imgs {
    // display: flex;
    // flex-wrap: wrap;
    width: 70%;
    // min-height:40px;
    padding: 0 10px;
    .img {
      float: left;
      margin: 0 5px 5px 0;
      width: 50px;
      height: 50px;
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
      text-align: center;
      line-height: 50px;
      border: 1px solid #999;
      position: relative;
      .del {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 20px;
        color: #aaa;
        z-index: 500;
      }
    }
  }
  .plus {
    float: left;
    margin: 0 5px 5px 0;
    width: 50px;
    height: 50px;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    text-align: center;
    line-height: 50px;
    border: 1px solid #999;
    position: relative;
    border: 1px dashed #999;
    cursor: pointer;
  }
}
</style>
<style>
.el-radio + .el-radio {
  margin: 0;
  margin-right: 30px;
}
.el-radio {
  margin-right: 30px;
  margin-bottom: 5px;
}
</style>
