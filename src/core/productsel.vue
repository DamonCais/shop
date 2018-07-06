<template>
	<div>
		<el-dialog class="dialog" :title="title" :visible.sync="show" width="70%">
			<!-- 选择商店 -->
			<div v-show="title==='选择商品'" class="row">
				<span>{{$t('PRODUCTSEL_STORE_SELECT')}}:</span>
				<el-select @change="storeIdChange" v-model="storesData.storeId" placeholder="请选择">
					<el-option v-for="item in storesData.storesList" :key="item._id" :label="item.name[editlang]" :value="item._id">
					</el-option>
				</el-select>
				<span>{{$t('PRODUCTSEL_PRODUCT_SELECT_QUANTITY')}}：{{quantity}}</span>
			</div>
			<!-- 列表显示 -->
			<el-table class="table rowClick" @row-click="rowClick" ref="multipleTable" v-if="show" :data="gridData" height="500" @select-all="handleSelectionChange" @select="handleSelectionChange">
				<el-table-column width="55" v-if="!multi" fixed>
					<template slot-scope="scope">
						<input type="radio" name="select" v-model="picked" :value="scope.row">
					</template>
				</el-table-column>

				<el-table-column width="55" v-if="multi" type="selection" fixed>
				</el-table-column>

				<el-table-column v-for="(item,index) in showData" :key="index" :sortable="item.sortable" :label="item.label">
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
			</el-table>
			<el-pagination class="pagination" @current-change="handleCurrentChange" layout="prev, pager, next" :current-page.sync="pagination.currentPage" :total="pagination.total">
			</el-pagination>
			<div class="clearfix"></div>
			<el-button class="btn" @click="productsel">{{$t('PRODUCTSEL_CONFIRM')}}</el-button>
			<div class="clearfix"></div>
		</el-dialog>
	</div>
</template>

<script>
export default {
	props: {
		value: Boolean,
		multi: Boolean,
		title: String,
		storesData: {
			type: Object,
		},
		gridData: {
			type: Array,
		},
		showData: {
			type: Array,
		},
		pagination: {
			type: Object,
			default() {
				return {
					currentPage: 1,
					total: 50,
				}
			}
		}
	},
	data() {
		return {
			show: this.value,
			sel: -1,
			multipleSelection: [],
			picked: {},
			temporarySelection: {},
			quantity: 0,
		}
	},
	methods: {
		storeIdChange() {
			this.$emit('sortChange', 1);
		},
		productsel() {
			if (!this.multi) {
				this.multipleSelection[0] = this.picked;
			} else {
				for (var key in this.temporarySelection) {
					this.temporarySelection[key].forEach(element => {
						this.multipleSelection.push(...element);
					});
				}
			}
			this.temporarySelection = {};
			this.$emit('productsel', this.multipleSelection);
			this.multipleSelection = [];
			this.quantity = 0;
		},
		handleSelectionChange(selection, row) {
			console.log(selection);
			if (!this.temporarySelection[this.storesData['storeId']]) {
				this.temporarySelection[this.storesData['storeId']] = [];
			}

			this.temporarySelection[this.storesData['storeId']][this.pagination['currentPage']] = selection;
			this.quantityCalculate();
		},
		quantityCalculate() {
			let q = 0;
			for (var key in this.temporarySelection) {
				this.temporarySelection[key].forEach(element => {
					q += element.length;
				});
			}
			this.quantity = q;
		},
		handleCurrentChange(val) {
			this.$emit('sortChange', val);
		},
		toggleSelection() {
			if (!this.temporarySelection[this.storesData['storeId']] || !this.temporarySelection[this.storesData['storeId']][this.pagination['currentPage']]) {
				return;
			}
			let ids = [];
			this.temporarySelection[this.storesData['storeId']][this.pagination['currentPage']].forEach(element => {
				ids.push(element['_id'])
			});
			let obj = this.gridData.filter(
				d => ids.indexOf(d._id) !== -1
			);
			obj.forEach(row => {
				this.$refs.multipleTable.toggleRowSelection(row);
			});
		},
		rowClick(row) {
			console.log(row);
			if (!this.temporarySelection[this.storesData['storeId']]) {
				this.temporarySelection[this.storesData['storeId']] = [];

			}
			if (!this.temporarySelection[this.storesData['storeId']][this.pagination['currentPage']]) {
				this.temporarySelection[this.storesData['storeId']][this.pagination['currentPage']] = [];
			}
			let tempSelection = this.temporarySelection[this.storesData['storeId']][this.pagination['currentPage']]
			let selection = this.temporarySelection[this.storesData['storeId']][this.pagination['currentPage']].filter(r => r._id !== row._id);
			if (tempSelection.length === selection.length) {
				this.temporarySelection[this.storesData['storeId']][this.pagination['currentPage']].push(row);
			} else {
				this.temporarySelection[this.storesData['storeId']][this.pagination['currentPage']] = selection;
			}
			this.quantityCalculate();
			this.$refs.multipleTable.toggleRowSelection(row);

			// this.toggleSelection();
		},
	},
	watch: {
		show(val) {
			this.temporarySelection = {};
			if (!val) {
				this.pagination.currentPage = 1;
			}
			this.$emit('input', val);
		},
		value(val) {
			this.show = val;
		}
	},
	filters: {
		deepGet(value, path) {
			return (!Array.isArray(path) ? path.replace(/\[/g, '.').replace(/\]/g, '').split('.') : path).reduce((o, k) => (o || {})[k], value) || undefined;
		}
	},
}
</script>

<style lang="scss" scoped>
.dialog {
  .row {
    margin: 10px 0;
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
}
</style>
