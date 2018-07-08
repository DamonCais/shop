<template>
	<div class="title">
		<h4>{{block.items[0].title}}</h4>
		<h5>{{block.items[0].subtitle}}</h5>
		<span v-show="block.items[0].linkType" class="link">
			<i class="el-icon-arrow-right"></i>
		</span>
	</div>
</template>

<script>
export default {
	props: {
		block: {
			type: Object,
		},
	},
	computed: {
	},

}
</script>

<style lang="scss" scoped>
@import "../css/element.scss";
.title {
  padding: 10px 20px 10px 10px;
  min-height: 30px;
  position: relative;
  h4 {
    font-weight: 500;
    line-height: 18px;
    height: 18px;
    @include breakword($line: 1);
  }
  h5 {
    color: #aaa;
    font-size: 14px;
    line-height: 18px;
    min-height: 18px;
    max-height: 36px;
    @include breakword($line: 2);
  }
  .link {
    position: absolute;
    display: block;
    top: 0;
    bottom: 0;
    right: 10px;
    display: flex; /*Flex布局*/
    align-items: center; /*指定垂直居中*/
  }
}
</style>
