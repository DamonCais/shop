<template>
	<div>
		<el-dialog class="dialog" :title="title" :visible.sync="show" width="70%">
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
							<img v-if="item.type ==='image'" :src="'dist/'+_(scope.row,(item.prop))" alt="" style="width: 50px;height: 50px">
							<span v-if="item.type ==='string'">{{scope.row|deepGet(item.prop)}}</span>
							<span v-if="item.type ==='price'">{{'￥'+_(scope.row,item.prop)}}</span>

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
      type: Object
    },
    gridData: {
      type: Array
    },
    showData: {
      type: Array
    },
    pagination: {
      type: Object,
      default() {
        return {
          currentPage: 1,
          total: 50
        };
      }
    }
  },
  data() {
    return {
      show: this.value,
      sel: -1,
      multipleSelection: [],
      picked: {},
      temporarySelection: [],
      quantity: 0
    };
  },
  methods: {
    storeIdChange() {
      this.$emit("sortChange", 1);
    },
    productsel() {
      console.log(this.temporarySelection);
      this.$emit("productsel", this.temporarySelection);
      this.temporarySelection = [];
      this.quantity = 0;
    },
    handleSelectionChange(selection, row) {
      console.log(selection);

      this.temporarySelection = selection;
    },

    handleCurrentChange(val) {
      this.$emit("sortChange", val);
    },
    toggleSelection() {
      let ids = [];
      this.temporarySelection.forEach(element => {
        ids.push(element["_id"]);
      });
      let obj = this.gridData.filter(d => ids.indexOf(d._id) !== -1);
      obj.forEach(row => {
        this.$refs.multipleTable.toggleRowSelection(row);
      });
    },
    rowClick(row) {
      let index = this.temporarySelection.findIndex(
        item => item._id === row._id
      );
      if (index === -1) {
        this.temporarySelection.push(row);
      } else {
        this.temporarySelection = this.temporarySelection.filter(
          item => item._id !== row._id
        );
      }
      this.$refs.multipleTable.toggleRowSelection(row);
      // this.toggleSelection();
    }
  },
  watch: {
    show(val) {
      this.temporarySelection = [];
      if (!val) {
        this.pagination.currentPage = 1;
      }
      this.$emit("input", val);
    },
    value(val) {
      this.show = val;
    }
  },
  filters: {
    deepGet(value, path) {
      return (
        (!Array.isArray(path)
          ? path
              .replace(/\[/g, ".")
              .replace(/\]/g, "")
              .split(".")
          : path
        ).reduce((o, k) => (o || {})[k], value) || undefined
      );
    }
  }
};
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
