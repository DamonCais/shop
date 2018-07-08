
<template>
  <div class="contain">
    <el-button style="margin:10px;" @click="addProduct">{{$t('CATEGORY_PRODUCT_ADD')}}</el-button>

    <!-- 表格 -->
    <my-table :gridData="gridData" :showData="showData" class="rowClick">
      <!-- <el-table-column :label="$t('PAGE_OPERATE')" width="100">
        <template slot-scope="scope">
          <el-button @click="pageEdit(scope.row)" type="text" size="small">{{$t('PAGE_EDIT')}}</el-button>
          <el-button @click="pageDel(scope.row)" type="text" size="small">{{$t('PAGE_DELETE')}}</el-button>
        </template>
      </el-table-column> -->

      <el-table-column :label="$t('PAGE_OPERATE')" width="100">
        <template slot-scope="scope">
          <el-button @click="productEdit(scope.row)" type="text" size="small">{{$t('PAGE_EDIT')}}</el-button>
          <el-button @click="productDel(scope.row)" type="text" size="small">{{$t('PAGE_DELETE')}}</el-button>
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
import myPop from "@/components/myPop";
export default {
  computed: {},
  mounted() {
    console.log(this.$route);
    this.getProduct();
  },
  data() {
    return {
      gridData: [],
      showData: [
        {
          prop: "created",
          label: "creatAt",
          width: 120,
          type: "time"
        },
        {
          prop: "name",
          label: "Name",
          width: 120,
          type: "string"
        },
        { prop: "img.path", label: "Image", width: 120, type: "image" }
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
    productEdit(obj) {
      this.$router.push({ path: "/products/" + obj._id });
    },
    productDel(obj) {
      doPost("/product.del", { _id: obj._id }).then(res => {
        this.getProduct();
      });
    },
    addProduct() {
      this.$router.push({ path: "/products/add" });
    },
    getProduct() {
      this.gridData = [];
      doGet("/product.get", { p: this.pagination.currentPage - 1 }).then(
        res => {
          this.gridData = res.data.products;
          this.pagination.total = res.data.total;
        }
      );
    },
    handleCurrentChange(val) {
      this.imgPagination.currentPage = val;
      this.getProduct();
    }
  },
  filters: {},
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


