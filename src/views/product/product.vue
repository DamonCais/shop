<template>
  <div class="contain">
    <el-button style="margin-bottom:20px;" @click="addOptions">添加选项</el-button>
    <el-button @click="productSave" type="success">保存</el-button>
    <el-button @click="productReinit" type="danger">重置</el-button>
    <el-tabs type="card" v-model="editableTabsValue" class="tabs" tab-position="top" closable @tab-remove="removeTab">
      <el-tab-pane v-for="(p,i) in product" :key="i" :name="i+''" :label="p.name||('选项'+i)">
        <div class="form">
          <el-form label-width="80px" label-position="right">
            <el-form-item label="添加图片">
              <div v-for="(logo,i) in p.Imgs" :key="i" class="logo" @mouseover="del=i" @mouseout="del=-1" @click="getImg(i)" :style="'background-image:url(../dist/'+logo.path+')'">
                <i v-show="del===i" @click.stop="imgDel(i)" class="el-icon-error del"></i>
                <span v-show="del===i" class='imgTxt'>更换图片</span>
              </div>
              <div @click="getImg(-1)" class="logo plus">
                <i class="el-icon-plus"></i>
              </div>
            </el-form-item>
            <el-form-item label="名字">
              <el-input v-model="p.name" />
            </el-form-item>
            <el-form-item label="价格">
              <el-input v-model="p.price" placeholder="请输入价格">
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
            <el-form-item label="库存">
              <el-input placeholder="库存数量" v-model="quantity" class="input-with-select" :disabled="p.stock==='unlimited'">
                <el-select v-model="p.stock" slot="prepend" placeholder="请选择">
                  <el-option label="不限量" value="unlimited"></el-option>
                  <el-option label="限量" value="limited"></el-option>
                </el-select>
              </el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
    </el-tabs>

    <div class="mt-4">

    </div>
    <imgsel :pagination="imgPagination" @pageChange="imgpageChange" @imgsel="imgsel" :imgdata="imgdata" v-model="imgDialog" />
  </div>
</template>

<script>
import imgsel from "@/core/imgsel";
import { doPost, doGet, doPatch } from "@/api/api";
export default {
  computed: {
    quantity: {
      set(val) {
        let index = parseInt(this.editableTabsValue);
        this.product[index].quantity = val;
      },
      get() {
        let index = parseInt(this.editableTabsValue);
        return this.product[index].stock === "unlimited"
          ? "unlimited"
          : this.product[index].quantity;
      }
    }
  },
  data() {
    return {
      del: -1,
      edit: -1,
      imgdata: [],
      imgPagination: {
        currentPage: 1,
        total: 0,
        pageSize: 15
      },
      imgDialog: false,
      productImgs: [],

      editableTabsValue: "0",
      product: [
        {
          Imgs: [],
          price: null,
          name: "",
          stock: "limited",
          quantity: 10
        }
      ]
    };
  },

  methods: {
    productSave() {
      doPost("/product.add", { product: this.product }).then(res => {
        console.log(res);
      });
    },
    productReinit() {
      this.editableTabsValue = "0";
      this.product = [
        {
          Imgs: [],
          price: null,
          name: "",
          stock: "limited",
          quantity: 10
        }
      ];
    },
    getImg(i) {
      this.edit = i;
      this.imgdata = [];
      doGet(`/media.get`, {
        p: this.imgPagination.currentPage - 1
      }).then(res => {
        this.imgPagination.total = res.data.total;
        this.imgdata = res.data.imgs;
        this.imgDialog = true;
      });
    },
    imgDel(i) {
      let index = this.editableTabsValue;
      this.product[index].Imgs.splice(i, 1);
    },
    imgsel(val) {
      console.log("imgsel" + val);
      if (val === -1) {
        return;
      }
      let index = this.editableTabsValue;
      if (this.edit === -1) {
        this.product[index].Imgs.push(this.imgdata[val]);
      } else {
        this.product[index].Imgs.splice(this.edit, 1, this.imgdata[val]);
      }
      this.imgDialog = false;
    },

    imgpageChange(val) {
      this.imgPagination.currentPage = val;
      this.getImg();
    },
    addOptions() {
      this.product.push({
        Imgs: [],
        price: null,
        name: "",
        stock: "limited",
        quantity: 10
      });
    },
    removeTab(targetName) {
      let index = parseInt(targetName);
      if (this.product.length > 1) {
        this.$confirm("此操作将删除当前选项, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.editableTabsValue = "0";
            this.product.splice(index, 1);
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }
    }
  },
  components: {
    imgsel
  }
};
</script>

<style>
</style>


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
  .tabs {
    margin: 0 auto;
  }
  .form {
    width: 440px;
    .logo {
      width: 80px;
      height: 80px;
      float: left;
      margin: 10px 10px 10px 0;
      box-sizing: border-box;
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
      position: relative;
      cursor: pointer;
      .del {
        position: absolute;
        font-size: 16px;
        right: -8px;
        top: -8px;
      }
      .imgTxt {
        position: absolute;
        bottom: 0;
        width: 100%;
        text-align: center;
        color: #fff;
        background: #666;
        line-height: 25px;
        font-size: 12px;
      }
    }
    .plus {
      text-align: center;
      line-height: 80px;
      border: 1px dashed #999;
    }
  }
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
<style>
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>