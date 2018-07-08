<template>
	<div class="contain">
		<!-- 表格 -->
		<el-button type="primary" @click="pageAdd">{{$t('PAGE_ADDPAGE')}}</el-button>
		<my-table :gridData="gridData" :showData="showData" @rowClick="pageEdit" class="rowClick">
			<template @click.stop="clickStop" slot="sortIndex">
				<el-table-column prop="sortIndex" sortable :label="$t('PAGE_SORT_INDEX')">
					<div class="sortIndex" @click.stop="clickStop" slot-scope="scope">
						<myPop @sortUpdate="pageListGet" :row="scope.row" />
					</div>
				</el-table-column>
			</template>

			<el-table-column :label="$t('PAGE_OPERATE')" width="100">
				<template slot-scope="scope">
					<el-button @click="pageEdit(scope.row)" type="text" size="small">{{$t('PAGE_EDIT')}}</el-button>
					<el-button @click.stop="pageDel(scope.row)" type="text" size="small">{{$t('PAGE_DELETE')}}</el-button>
				</template>
			</el-table-column>

		</my-table>

		<!-- 分页 -->
		<el-pagination class="pagination" @current-change="handleCurrentChange" layout="prev, pager, next" :current-page.sync="pagination.currentPage" :total="pagination.total">
		</el-pagination>
		<div class="clearfix"></div>
	</div>
</template>

<script>
import { doPost, doGet, doDel } from "@/api/api";
import { formatTime } from "@/utils/index";
import myTable from "@/components/myTable";
import { mapGetters } from "vuex";
import myPop from "./myPop";
export default {
  computed: {},

  mounted() {
    this.pageListGet();
  },
  data() {
    return {
      gridData: [],
      showData: [
        {
          prop: "created",
          label: "PAGE_CREATED_AT",
          width: 120,
          type: "time"
        },
        // { prop: 'sortIndex', label: 'PAGE_SORT_INDEX', width: 120, type: 'string', sortable: 'custom', clickAble: true },

        {
          prop: "pageTitle",
          label: "PAGE_PAGE_TITLE",
          width: 120,
          type: "string"
        }
        // { prop: "status", label: "PAGE_STATUS", width: 120, type: "string" }
      ],
      pagination: {
        currentPage: 1,
        total: 0
      },
      sort: "",
      sortIndex: 0,
      popoverVisible: []
    };
  },
  methods: {
    pageListGet() {
      this.gridData = [];
      doGet("/page.get").then(res => {
        console.log(res);
        this.gridData = res.data.pages;
      });
    },
    handleCurrentChange(val) {
      this.pagination.currentPage = val;
    },
    pageEdit(row) {
      console.log(row);
      this.$router.push({ path: "/pages/" + row["_id"] });
    },
    pageDel(row) {
      this.delConfirm().then(() => {
        doPost(`/page.del`, { _id: row["_id"] }).then(res => {
          this.confirmSuccess();
          this.pageListGet();
        });
      });
    },
    pageAdd() {
      this.$router.push({ path: "/pages/add" });
    },
    sortChange(e) {
      console.log(e);
      this.sort = e.prop ? (e.order === "ascending" ? "" : "-") + e.prop : "";
      this.pageListGet();
    },
    clickStop(row) {
      console.log(row);
    }
  },
  filters: {
    // _formatTime(val) {
    // 	return formatTime(val);
    // }
  },
  components: {
    myTable,
    myPop
  }
};
</script>

<style lang="scss" scoped>
.contain {
  padding: 10px;
  min-height: 300px;
  background: #fff;
  // padding: 20px 100px;
  // box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.2);
  .addBtn {
    margin: 10px 0;
  }
  .sortIndex {
    cursor: default;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    display: flex;
    padding-left: 10px;
    justify-content: flex-start;
    align-items: center;
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


