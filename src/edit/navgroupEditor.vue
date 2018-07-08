<template>
	<div class="navgrounp">
		<el-form ref="form" class="form" label-width="80px">
			<el-form-item :label="$t('NAVGROUP_FILLTYPE')">
				<el-radio-group v-model="block.template">
					<el-radio label="image-text">{{$t('NAVGROUP_IMAGE_TEXT')}}</el-radio>
					<el-radio label="image-only">{{$t('NAVGROUP_IMAGE_ONLY')}}</el-radio>
					<el-radio label="text-only">{{$t('NAVGROUP_TEXT_ONLY')}}</el-radio>
				</el-radio-group>
			</el-form-item>
		</el-form>
		<draggable :options="dragOptions" v-model="block.items">
			<transition-group>
				<div @mouseover="del=i" @mouseout="del=-1" v-for="(item,i) in block.items" :key="i" class="imgform" :class="{'text-only':block.template==='text-only'}">
					<i v-show="del===i" @click="itemDel(i)" class="el-icon-error del"></i>
					<div class="addimg" v-show="block.template!=='text-only'">
						<div class="icon" @click="imgChange(i)" :style="'background-image:url(dist/'+_(item,'image.path')+')'">
							<i v-if="!item.image.path" class="el-icon-plus"></i>
							<h6 v-if="!item.image.path">{{$t('NAVGROUP_IMAGE_ADD')}}</h6>
							<h5 v-if="item.image.path">{{$t('NAVGROUP_IMAGE_CHANGE')}}</h5>
						</div>
					</div>
					<div class="row" v-show="block.template!=='image-only'">
						<label for="">{{$t('NAVGROUP_TITLE')}}</label>
						<input placeholder="请输入标题" v-model="item.title" type="text">
					</div>
					<!-- <div class="row">
						<linktype :storesData="storesData" :item="item" />
					</div> -->
				</div>
			</transition-group>
		</draggable>
		<div @click="itemAdd" class="additem">
			<i class="el-icon-plus"></i>
			<h6>{{$t('NAVGROUP_ADD_A_NAV')}}</h6>
		</div>

		<imgsel :pagination="pagination" @pageChange="pageChange" @imgsel="imgsel" :imgdata="imgdata" v-model="dialogVisible" />
	</div>
</template>

<script>
import draggable from "vuedraggable";
import imgsel from "@/core/imgsel";
import linktype from "@/core/linktype";
import { doPost, doGet } from "@/api/api";
export default {
  props: {
    block: {
      type: Object
    },
    storesData: {
      type: Object
    }
  },

  data() {
    return {
      dragOptions: {
        animation: 120,
        scroll: true,
        group: "sortlist",
        ghostClass: "ghost-style"
      },
      dialogVisible: false,
      selvalue: "beijing",
      del: -1,
      imgdata: [],
      sel: -1,
      pagination: {
        currentPage: 1,
        total: 50,
        pageSize: 15
      }
    };
  },
  methods: {
    linkType(linktype) {
      console.log(linktype);
    },
    onSubmit() {
      console.log("submit!");
    },
    itemDel(i) {
      this.block.items.splice(i, 1);
    },
    itemAdd() {
      this.block.items.push({
        image: {
          url:
            "https://img.yzcdn.cn/public_files/2018/01/30/585dae8447d80013ef9344adc973c6ee.png?imageView2/2/w/520/h/0/q/75/format/webp"
        },
        title: ""
      });
    },
    imgChange(i) {
      this.sel = i;
      this.getImg();
    },
    imgsel(val) {
      if (val === -1) {
        return;
      }
      this.dialogVisible = false;
      let item = this.block.items[this.sel];
      item.image = this.imgdata[val];
      this.block.items.splice(this.sel, 1, item);
      // this.block.items[this.sel].imgsrc = this.imgdata[val].image.path;
    },
    getImg() {
      this.imgdata = [];
      doGet(`/media.get`, {
        p: this.pagination.currentPage - 1
      }).then(res => {
        this.pagination.total = res.data.total;
        this.imgdata = res.data.imgs;
        this.dialogVisible = true;
      });
    },
    pageChange(val) {
      this.pagination.currentPage = val;
      this.getImg();
    }
  },
  components: {
    imgsel,
    draggable,
    linktype
  }
};
</script>

<style lang="scss" scoped>
.navgrounp {
  // width: 500px;
  .imgform {
    width: 100%;
    min-height: 100px;
    padding: 10px 10px 10px 100px;
    margin-bottom: 15px;
    box-sizing: border-box;
    border: 1px dashed #aaa;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .addimg {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 98px;
      padding: 10px;
      .icon {
        height: 100%;
        text-align: center;
        border: 1px dashed #aaa;
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        color: #38f;
        font-size: 14px;
        position: relative;
        cursor: pointer;
        i {
          font-size: 40px;
        }
        h5 {
          width: 100%;
          background: #666;
          color: #fff;
          position: absolute;
          bottom: 0;
          line-height: 20px;
        }
      }
    }
    .row {
      padding: 0 10px;
      min-height: 20px;
      label {
        margin-right: 5px;
      }
      input {
        width: 195px;
      }
    }
    .del {
      position: absolute;
      right: -10px;
      top: -10px;
      font-size: 20px;
      color: #aaa;
    }
    .imgitem {
      margin: 0;
    }
  }
  .text-only {
    padding: 10px;
  }
  .additem {
    min-height: 35px;
    padding: 10px 15px;
    margin-bottom: 10px;
    box-sizing: border-box;
    border: 1px dashed #aaa;
    color: #38f;
    cursor: pointer;
    i {
      float: left;
      margin-right: 15px;
    }
  }
}
</style>