<template>
	<div>
		<el-popover ref="popover" v-model="popoverVisible" placement="right" title="排序号" width="200" trigger="click">
			<el-form ref="ruleForm2">
				<el-form-item label="">
					<el-input ref="sort" v-model.number="sortIndex"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button @click="sortCancel">取消</el-button>
					<el-button type="primary" @click="sortUpdate(row)">确定</el-button>
				</el-form-item>
			</el-form>
			<div class="pop" slot="reference">{{row.sortIndex}}
				<i style="color:blue;" class="el-icon-edit"></i>
			</div>
		</el-popover>

	</div>
</template>

<script>
import { doPost } from "@/api/api";

export default {
  props: {
    row: {
      type: Object
    }
  },
  data() {
    return {
      sortIndex: this.row.sortIndex,
      popoverVisible: false
    };
  },
  methods: {
    sortUpdate(row) {
      console.log(row);
      doPost(`page.update`, { id: row._id, sortIndex: this.sortIndex }).then(
        res => {
          if (res.status === 200) {
            this.$message({
              message: "update success",
              type: "success"
            });
            this.popoverVisible = false;
            this.$emit("sortUpdate");
            // window.location.reload();
          }
        }
      );
    },
    clickStop() {},
    sortCancel() {
      this.popoverVisible = false;
      // this.sortIndex = this.row.sortIndex;
    },
    onClick(e) {
      // e.target.focus();
      // this.popoverVisible = true;
    }
  },
  watch: {
    popoverVisible() {
      this.sortIndex = this.row.sortIndex;
      setTimeout(() => {
        this.$refs.sort.focus();
        console.log(this.$refs.sort);
      }, 200);
    }
  }
};
</script>

<style lang="scss" scoped>
.pop {
  cursor: pointer;
  width: 100%;
  height: 100%;
}
</style>
