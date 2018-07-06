<template>
	<div class="contain">
		<el-row>
			<el-col :span="10">
				<el-input type="textarea" :rows="15" placeholder="请输入内容" v-model="textarea">
				</el-input>
			</el-col>
			<el-col :span="4" class="btns">
				<el-button @click="onClick" type="">按钮</el-button>

			</el-col>
			<el-col :span="10">
				<!-- <el-input type="textarea" :rows="15" placeholder="请输入内容" v-model="textarea"> -->
				<div style="border:1px solid black;min-height:300px;">
					<p v-for="(p,i) in arrZh" :key="i">{{p}}</p>
				</div>
				<div style="border:1px solid black;min-height:300px;">
					<p v-for="(p,i) in arrEn" :key="i">{{p}}</p>
				</div>
				<!-- </el-input> -->
			</el-col>
		</el-row>

	</div>
</template>

<script>
import { toUPPer, getWordMean } from "./util.js";
import { upLoadImgV2 } from "@/api/api";
export default {
  data() {
    return {
      textarea: "",
      newText: [],
      arrZh: [],
      arrEn: []
    };
  },
  methods: {
    async onClick() {
      // let obj = eval('(' + `{${this.textarea}}` + ')')
      // for (var k in obj) {
      // 	this.newText.push(k.toUpperCase());
      // }
      this.arrZh = [];
      this.arrEn = [];
      let arr = this.textarea.trim().split(",");
      console.log(arr);
      for (var key in arr) {
        let element = arr[key];
        let strArr = toUPPer(element).split("_");
        let str = strArr[strArr.length - 1];
        let enArr = [];
        strArr.slice(1).forEach(str => {
          enArr.push(
            str.substring(0, 1).toUpperCase() + str.substring(1).toLowerCase()
          );
        });
        let res = await getWordMean(str);
        console.log(element);
        this.arrZh.push(`${toUPPer(element)}: '${res.split("，")[0]}',`);
        console.log(this.arrZh);
        this.arrEn.push(`${toUPPer(element)}:'${enArr.join(" ")}',`);
      }
      //   arr.forEach(async element => {
      //     console.log(element);
      //     let strArr = toUPPer(element).split("_");
      //     let str = strArr[strArr.length - 1];
      //     let enArr = [];
      //     strArr.slice(1).forEach(str => {
      //       enArr.push(
      //         str.substring(0, 1).toUpperCase() + str.substring(1).toLowerCase()
      //       );
      //     });
      //     let res = await getWordMean(str);
      //     this.arrZh.push(`${toUPPer(element)}: '${res.split("，")[0]}',`);
      //     // this.arrEn.push(`${toUPPer(element)}:'${str.substring(0, 1).toUpperCase() + str.substring(1).toLowerCase()}',`)
      //     this.arrEn.push(`${toUPPer(element)}:'${enArr.join(" ")}',`);
      //   });
    },
    imgChange() {
      let inputDOM = this.$refs.imginput;
      if (!inputDOM.files[0] || inputDOM.files[0].type.indexOf("image") == -1)
        return;
      // let size = Math.floor(inputDOM.files[0].size / 1024);
      // if (size > 2000) return;
      const formData = new FormData();
      formData.append("file", inputDOM.files[0]);
      this.upimg(formData);
    },
    upimg(formData) {
      this.loading = true;
      upLoadImgV2("stores/5aefad6de3b736281c89d9ae/medias", formData).then(
        res => {
          console.log(res);
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.contain {
  // width: 1000px;
  min-height: 300px;
  background: #fff;
  padding: 10px;
  .btns {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
}
</style>
