
<template>
  <div>
    <el-dialog v-loading="loading" class="dialog" :title="$t('IMAGESEL_TITLE')" :visible.sync="show" width="50%">
      <input class="imginput" type="file" id="imginput" ref="imginput" @change="imgChange">
      <label class="imglabel" for="imginput">
        上传图片
      </label>
      <ul class="content">
        <li v-for="(item,i) in imgdata" :key="i" class="item" :class="{'active':i===sel}">
          <div class="img">
            <img @click="sel=sel===i?-1:i" :src="'dist/'+item.path" alt="">
          </div>
        </li>
      </ul>
      <el-pagination class="pagination" @current-change="handleCurrentChange" layout="prev, pager, next" :page-size="pagination.pageSize" :current-page.sync="pagination.currentPage" :total="pagination.total">
      </el-pagination>
      <div class="clearfix"></div>
      <el-button class="btn" @click="imgsel">{{$t('IMAGESEL_CONFIRM')}}</el-button>
      <div class="clearfix"></div>
    </el-dialog>
  </div>
</template>

<script>
import { upLoadImg } from "@/api/api";
export default {
  props: {
    value: Boolean,
    imgdata: {
      type: Array
    },
    pagination: {
      type: Object
    }
  },
  data() {
    return {
      show: this.value,
      imgsrc:
        "https://s3.cn-north-1.amazonaws.com.cn/guzzu-cn-assets-1/images/06c55e8e-4e21-4a63-940f-9f1f5332538e-medium.jpg",
      sel: -1,
      loading: false
    };
  },
  methods: {
    imgupload() {
      console.log("upload");
    },
    imgsel() {
      this.$emit("imgsel", this.sel);
    },
    handleCurrentChange(val) {
      this.$emit("pageChange", val);
    },
    imgChange() {
      let inputDOM = this.$refs.imginput;
      if (!inputDOM.files[0] || inputDOM.files[0].type.indexOf("image") == -1)
        return;
      // let size = Math.floor(inputDOM.files[0].size / 1024);
      // if (size > 2000) return;
      const formData = new FormData();
      formData.append("files", inputDOM.files[0]);
      this.upimg(formData);
    },
    upimg(formData) {
      this.loading = true;
      console.log(formData);
      upLoadImg(`/media.add`, formData).then(res => {
        if (res.status === 200) {
          this.$emit("pageChange", 1);
          this.loading = false;
        }
      });
    }
  },
  watch: {
    show(val) {
      this.$emit("input", val);
    },
    value(val) {
      this.show = val;
    }
  }
};
</script>

<style lang="scss" scoped>
.dialog {
  // position: relative;
  .imginput {
    position: absolute;
    left: -9999px;
  }
  .imglabel {
    display: block;
    width: 80px;
    height: 30px;
    line-height: 30px;
    overflow: hidden;
    background: #409eff;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
    margin: 10px 0;
  }
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
