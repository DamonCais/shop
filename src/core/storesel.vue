<template>
	<div>
		<el-dialog class="dialog" :title="$t(title)" :visible.sync="show" width="70%">
			<el-table @row-click="rowClick" ref="multipleTable" class="table rowClick" :data="gridData" height="500" @select-all="handleSelectionChange" @select="handleSelectionChange">

				<el-table-column width="55" v-if="!multi" fixed>
					<template slot-scope="scope">
						<input type="radio" name="select" v-model="picked" :value="scope.row">
					</template>
				</el-table-column>

				<el-table-column width="55" v-if="multi" type="selection" fixed>
				</el-table-column>

				<el-table-column v-for="(item,index) in showData" :key="index" :sortable="item.sortable" :label="$t(item.label)">
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
			<el-button class="btn" @click="storesel">{{$t('STORESEL_CONFIRM')}}</el-button>
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
			picked: {}
		}
	},
	methods: {
		storesel() {
			if (!this.multi) {
				this.multipleSelection[0] = this.picked;
			}
			this.$emit('storesel', this.multipleSelection);
		},
		handleSelectionChange(val) {
			this.multipleSelection = val;
		},
		handleCurrentChange(val) {
			this.$emit('pageChange', val);
		},
		rowClick(row) {
			this.picked = row;
		}
	},
	watch: {
		show(val) {
			this.$emit('input', val);
		},
		value(val) {
			this.show = val;
		}
	},

}
</script>

<style lang="scss" scoped>
.dialog {
  .content {
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
    border-top: 1px solid #000;
    border-bottom: 1px solid #000;
    background: #eee;
    .item {
      flex-basis: 20%;
      position: relative;
      // width: 25%;
      height: 0;
      padding-bottom: 20%;
      .img {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        position: absolute;
        padding: 5px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .active {
      img {
        border: 1px solid blue;
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
}
</style>
