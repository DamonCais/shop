<template>
	<div class="contain">
		<div class="app-preview" :style="'background-color:'+blocks[0].color">
			<!-- 页面标题 -->
			<header class="header" @click="sel=0">
				<h1>
					<span>
						{{blocks[0].pageTitle===''?'此处应填入店铺主页标题':blocks[0].pageTitle}}
					</span>
				</h1>
			</header>
			<div class="prelist">
				<!-- 页面显示 -->
				<draggable :options="dragOptions" v-model="blocks" :move="getdata" @update="datadragEnd">
					<div ref="pre" class="pre" v-for="(pre,index) in blocks" :key="index" v-if="index" @click="getSel(index)">
						<preview ref="preview" :block="pre" :onEdit="sel===index" />
						<span @click.stop="del" v-show="sel===index" class="del">删除</span>
						<span @click="push" v-show="sel===index" class="add push">
							<i class="el-icon-circle-plus"></i>
						</span>
						<span @click="insert" v-show="sel===index" class="add insert">
							<i class="el-icon-circle-plus"></i>
						</span>
					</div>
				</draggable>
				<!-- 页面编辑 -->
				<editor :style="'top:'+editOffset+'px'" ref="editor" class="editor" :block="blocks[sel]" />
				<div class="clearfix"></div>
			</div>
			<!-- 添加按键 -->
			<div class="btns">
				<span class="mybtn" v-for="(btn,index) in btns" :key="index">
					<el-button type="primary" @click="edit(btn)" style="width:100%">
						{{$t(btn)}}
					</el-button>
					<!-- <el-button size="mini" type="primary" @click="edit(btn)">{{btn}}</el-button> -->
				</span>
			</div>
		</div>
		<div class="clearfix"></div>
		<!-- 弹出按键 -->
		<el-dialog title="选择组件" :visible.sync="centerDialogVisible" width="500px" center>
			<div class="btns">
				<span class="mybtn" v-for="(btn,index) in btns" :key="index">
					<el-button type="primary" @click="selbtn(btn)" style="width:100%">{{$t(btn)}}</el-button>
				</span>
			</div>
		</el-dialog>
		<!-- 底部按钮 -->
		<foot :uploadType="uploadType" @upload="upload" @preview="preview" />
	</div>
</template>

<script>
import { Message } from "element-ui";
import preview from "@/components/preview";
import draggable from "vuedraggable";
import editor from "@/components/editor";
import { createObjByBtn, PageToBlock, BlockToPage } from "@/utils/util";
import { doPost, doGet, doPatch } from "@/api/api";
import foot from "./foot";
export default {
  mounted() {
    if (this.$route.params.id === "add") {
      this.uploadType = "add";
      return;
    }
    this.uploadType = "update";
    this.pageGet(this.$route.params.id);
  },
  data() {
    return {
      btnType: "edit",
      centerDialogVisible: false,
      dragOptions: {
        animation: 120,
        scroll: true,
        group: "sortlist",
        ghostClass: "ghost-style"
      },
      btns: [
        "BTN_NAVGROUP",
        "BTN_BANNER",
        "BTN_TITLE",
        "BTN_PRODUCTGROUP",
        "BTN_SPACER"
      ],
      blocks: [
        {
          pageTitle: "文本标题",
          pageDescription: "文本描述",
          sortIndex: 0,
          type: "header"
        }
      ],
      header: "",
      sel: 0,
      editOffset: -50,
      uploadType: "add",
      blockChange: false,
      blockWatchOn: false
    };
  },
  methods: {
    pageGet(id) {
      if (id === "add") {
        return;
      }
      doGet(`/page.get`, { id: this.$route.params.id }).then(res => {
        let page = res.data.pages[0];
        this.header = JSON.stringify({
          pageTitle: page.pageTitle,
          pageDescription: page.pageDescription,
          sortIndex: page.sortIndex,
          type: "header"
        });
        this.blocks = PageToBlock(page);
        // this.$store.commit('SET_BREAD', res.data.pageTitle['en'])
      });
    },
    preview() {
      this.$router.push({ path: "/preview/" + this.$route.params.id });
    },
    upload() {
      let obj = BlockToPage(this.blocks);
      // obj.shoppingMall = this.shoppingMallId
      this.header = JSON.stringify(this.blocks[0]);
      doPost(`/page.add`, { page: obj, id: this.$route.params.id }).then(
        res => {
          this.$message({
            message: "save success",
            type: "success"
          });
          if (this.$route.params.id === "add") {
            this.uploadType = "update";
            this.$router.push({ path: "/pages/" + res.data["_id"] });
            location.reload();
          }
        }
      );
    },
    selbtn(btn) {
      this.centerDialogVisible = false;
      let obj = createObjByBtn(btn);
      switch (this.btnType) {
        case "edit":
          this.blocks.push(obj);
          this.sel = this.blocks.length - 1;
          break;
        case "insert":
          this.blocks.splice(this.sel, 0, obj);
          break;
        case "push":
          this.blocks.splice(this.sel + 1, 0, obj);
          this.sel = this.sel + 1;
          break;
      }
      this.btnType = "edit";
    },
    getSel(index) {
      this.sel = index;
    },
    edit(btn) {
      this.btnType = "edit";
      this.selbtn(btn);
    },
    del() {
      this.blocks.splice(this.sel, 1);
      this.sel = this.sel - 1;
    },
    push() {
      this.btnType = "push";
      this.centerDialogVisible = true;
    },
    insert() {
      this.btnType = "insert";
      this.centerDialogVisible = true;
    },
    getdata(evt) {
      this.sel = evt.draggedContext.index;
    },
    datadragEnd(evt) {
      this.sel = evt.newIndex + 1;
    }
  },
  watch: {
    sel(val) {
      if (!val) {
        this.editOffset = this.$refs.pre[0].offsetTop - 50;
        return;
      }
      setTimeout(() => {
        if (!this.$refs.pre[val - 1]) {
          return;
        }
        this.editOffset = this.$refs.pre[val - 1].offsetTop;
      }, 20);
    }
  },
  components: {
    preview,
    draggable,
    editor,
    foot
  }
};
</script>

<style lang="scss" scoped>
.contain {
  min-height: 300px;
  background: #fff;
  padding: 50px 50px;

  // min-height: 300px;
  // background: #fff;
  // padding: 20px 100px;
  // box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.2);
  .app-preview {
    border: 1px solid #000;
    width: 320px;
    min-height: 600px;
    margin-bottom: 300px;
    .header {
      background-image: url("https://img.yzcdn.cn/public_files/2017/12/15/21b99a4e00245cdbc09a43abb8619f33.png");
      height: 63px;
      color: #fff;
      position: relative;
      cursor: pointer;
      h1 {
        position: absolute;
        bottom: 10px;
        left: 0;
        right: 0;
        span {
          max-width: 160px;
          display: block;
          text-align: center;
          margin: 0 auto;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }
    .prelist {
      width: 100%;
      // background: red;
      padding-bottom: 30px;
      min-height: 300px;
      border-bottom: 1px solid #aaa;
      position: relative;
      .editor {
        position: absolute;
        left: 104%;
        top: 0;
        margin-bottom: 100px;
      }
      .pre {
        position: relative;
        margin: 2px 0;
        cursor: move;
        span {
          cursor: pointer;
        }
        .add {
          position: absolute;

          left: 50%;
          color: green;
          font-size: 20px;
          z-index: 1000;
          // color: white;
        }
        .push {
          bottom: -10px;
        }
        .insert {
          top: -10px;
        }
        .del {
          z-index: 1000;
          position: absolute;
          right: 0;
          bottom: 0;
          font-size: 8px;
          color: #fff;
          background: #666;
          padding: 3px;
        }
        &:last-child {
          // cursor: default;
        }
      }
    }
  }
}
.ghost-style {
  display: block;
  color: transparent;
  border-style: dashed;
}
.btns {
  display: flex;
  flex-wrap: wrap;
  .mybtn {
    box-sizing: border-box;
    width: 33.33%;
    padding: 4px;
  }
}
.clearfix {
  clear: both;
}
</style>
