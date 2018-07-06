<template>
	<div class="foot">
		<el-row :class="{'open':!sidebar.opened}" class="row">
			<el-button @click="upload" type="primary">{{uploadType!=='add'?$t('FOOTER_UPDATE'):$t('FOOTER_SAVE')}}</el-button>
			<!-- <el-button>{{$t('FOOTER_SAVE_AS_DRAFT')}}</el-button> -->
			<el-button v-show="uploadType!=='add'" @click="preview">{{$t('FOOTER_PREVIEW')}}</el-button>
			<!-- <el-button>{{$t('FOOTER_PREVIEW')}}</el-button> -->
		</el-row>
	</div>
</template>

<script>
export default {
	props: {
		uploadType: String,
	},
	methods: {
		upload() {
			this.$emit('upload');
		},
		preview() {
			this.$emit('preview');
		}
	}
}
</script>

<style lang="scss" scoped>
.foot {
  position: fixed;
  bottom: 0;
  left: 180px;
  right: 0;
  margin: 0 auto;
  z-index: 1800;
  transition: all 1s ease;
  .row {
    // width: 1040px;
    margin: 0 10px;
    display: flex;
    justify-content: center;
    background: #fff;
    box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.2);
    padding: 10px;
    position: relative;
    h6 {
      position: absolute;
      right: 0;
      top: 0;
      display: flex;
      border: 1px solid red;
      justify-content: space-around;
      text-align: center;
      background: #fff;
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
  .open {
    margin-left: -133px;
    transition: all 0.5s ease;
  }
}
</style>
