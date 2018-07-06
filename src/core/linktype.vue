<template>
	<div class="linktype">
		<label for="">{{$t('LINKTYPE_LINK_TYPE')}}</label>
		<span v-show="linkType" class="span">
			{{linkType|strLenFilter}}
			<i @click="linkDel" class="el-icon-close"></i>
		</span>
		<el-dropdown trigger="click" @command="handleCommand">
			<span style="cursor:pointer;" class="el-dropdown-link">
				{{item.linkType?$t('LINKTYPE_CHANGE'):$t('LINKTYPE_LINK_SELECT')}}
				<i class="el-icon-arrow-down el-icon--right"></i>
			</span>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item command="product">{{$t('LINKTYPE_PRODUCT')}}</el-dropdown-item>
				<el-dropdown-item command="store">{{$t('LINKTYPE_STORE')}}</el-dropdown-item>
				<el-dropdown-item command="shoppingMallPage">{{$t('LINKTYPE_PAGE')}}</el-dropdown-item>
				<el-dropdown-item command="category">{{$t('LINKTYPE_SHOPPING_MALL_CATEGORY')}}</el-dropdown-item>

			</el-dropdown-menu>
		</el-dropdown>
		<!-- <productsel :pagination="pagination" @pageChange="pageChange" @productsel="productsel" v-model="productDialog" :multi="false" :showData="showData" :gridData="gridData" /> -->
		<linksel ref="linkSel" :title="linkTitle" :storesData="storesData" :pagination="pagination" @sortChange="sortChange" @linksel="linksel" v-model="linkDialog" :multi="false" :showData="showData" :gridData="gridData" />
	</div>

</template>

<script>
import { doPost, doGet } from '@/api/api'
import productsel from './productsel'
import linksel from './linksel'
export default {
	props: {
		item: {
			type: Object,
		},
		storesData: {
			type: Object,
			default() {
				return {
					storesList: [],
					storeId: '',
				}
			}
		}
	},
	mounted() {
		// this.shoppingmallStoresGet();
	},
	data() {
		return {
			linkType: this.item.linkType || '',
			linkTitle: '',
			temporarylink: '',
			linkDialog: false,
			showData: [],
			productData: [
				{ prop: 'image.url', label: 'image', width: 120, type: 'image' },
				{ prop: 'name.en', label: 'name', width: 120, type: 'string' },
				{ prop: 'price', label: 'price', width: 120, type: 'price' },
			],
			shoppingmallpageData: [
				{ prop: 'pageTitle.en', label: 'pageTitle', width: 120, type: 'string' },
				{ prop: 'createdAt', label: 'createdAt', width: 120, type: 'time' },
				{ prop: 'status', label: 'status', width: 120, type: 'string' },
			],
			shoppingmallstoreData: [
				{ prop: 'logo.url', label: 'STORESEL_LOGO', width: 120, type: 'image' },
				{ prop: 'name', label: 'STORE_NAME', width: 120, type: 'lang' },
			],
			shoppingmallcategoryData: [
				{ prop: 'image.url', label: 'image', width: 120, type: 'image' },
				{ prop: 'name.en', label: 'name', width: 120, type: 'string' },
				{ prop: 'products.length', label: 'quantity', width: 120, type: 'string' },
			],
			gridData: [],
			// storesData: {
			// 	storesList: [],
			// 	storeId: '',
			// },
			pagination: {
				currentPage: 1,
				total: 50,
			},
		}

	},
	methods: {
		linkDel() {
			delete this.item[this.item.linkType];
			delete this.item.linkType;
			this.linkType = '';
			this.$emit('linkChange', this.item);
		},
		handleCommand(command) {
			if (this.temporarylink !== command) {
				this.pagination = {
					currentPage: 1,
					total: 50,
				}
				this.temporarylink = command;
			}
			switch (command) {
				case 'product': this.shoppingmallStoreProductGet(); break;
				case 'store': this.shoppingmallStoreGet(); break;
				case 'category': this.shoppingMallCategorysGet(); break;
				case 'shoppingMallPage': this.shoppingmallPagesGet(); break;
			}
		},
		linksel(links) {
			this.linkDialog = false;
			if (!links[0]['_id']) {
				return;
			}
			this.item.linkType = this.temporarylink;
			this.item[this.item.linkType] = links[0]['_id'];
			this.linkType = this.item.linkType;
			this.$emit('linkChange', this.item);

		},
		sortChange(val) {
			this.pagination.currentPage = val;
			this.handleCommand(this.temporarylink);
		},
		productsGet() {
			this.gridData = [];
			this.showData = this.productData;
			doGet('/products', { p: this.pagination.currentPage - 1 }).then(res => {
				this.pagination.total = parseInt(res.headers['x-total-count']);
				this.gridData = res.data;
				this.linkDialog = true;
			})
		},
		shoppingmallPagesGet() {
			this.gridData = [];
			this.linkTitle = 'shopping-mall-pages';
			this.showData = this.shoppingmallpageData;
			doGet(`shopping-malls/${this.shoppingMallId}/pages`, { p: this.pagination.currentPage - 1 }).then(res => {
				this.pagination.total = parseInt(res.headers['x-total-count']);
				this.gridData = res.data;
				this.linkDialog = true;
			})
		},
		shoppingmallStoreGet() {
			this.gridData = [];
			this.linkTitle = 'shopping-mall-stores';
			this.showData = this.shoppingmallstoreData;
			doGet(`shopping-malls/${this.shoppingMallId}/stores`, { p: this.pagination.currentPage - 1 }).then(res => {
				this.pagination.total = parseInt(res.headers['x-total-count']);
				this.gridData = res.data;
				this.linkDialog = true;
			})
		},
		shoppingMallCategorysGet() {
			this.gridData = [];
			this.linkTitle = 'shopping-mall-categorys';
			this.showData = this.shoppingmallcategoryData;
			doGet(`shopping-malls/${this.shoppingMallId}/categories`, { p: this.pagination.currentPage - 1 }).then(res => {
				this.pagination.total = parseInt(res.headers['x-total-count']);
				this.gridData = res.data;
				this.linkDialog = true;
			})
		},
		shoppingmallStoresGet() {
			doGet(`shopping-malls/${this.shoppingMallId}/stores`, { p: 0 }).then(res => {
				this.storesData = {
					storesList: res.data,
					storeId: res.data[0]['_id'],
				}
			})
		},
		shoppingmallStoreProductGet() {
			this.gridData = [];
			this.linkTitle = 'shopping-mall-products';
			this.showData = this.productData;
			doGet(`shopping-malls/${this.shoppingMallId}/stores/${this.storesData['storeId']}/products`, { p: this.pagination.currentPage - 1 }).then(res => {
				this.pagination.total = parseInt(res.headers['x-total-count']);
				this.gridData = res.data;
				this.linkDialog = true;
			})
		},
	},
	filters: {
		strLenFilter(str) {
			if (str.length > 12) {
				return str.substring(0, 12) + '...';
			}
			return str;
		}
	},
	components: {
		productsel,
		linksel
	}
}
</script>

<style lang="scss" scoped>
.linktype {
  width: 100%;
  min-height: 20px;
  line-height: 20px;
  label {
    margin-right: 5px;
  }
  .span {
    margin-left: 5px;
    vertical-align: bottom;
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
}
</style>
