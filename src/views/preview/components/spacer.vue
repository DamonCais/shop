<template>
<div>
	<div class="spacer"
	 :style="'height:'+block.height+'px;background-color:'+block.color">
		<!-- <div v-show="data.liners.indexOf('水平线')!==-1" class="liner"></div> -->
	</div>
</div>

</template>

<script>
export default {
	props:{
		block:{
			type:Object,
		}
	}
}
</script>

<style lang="scss" scoped>
.spacer{
			background: #f8f8f8;

	position: relative;
	.liner{
		position: absolute;
		top:50%;
		left:0;
		right: 0;
		border-top:1px solid #000;
	}
}
.top{
	border-top:1px solid #000;
}
.bottom{
	border-bottom: 1px solid #000;
}
</style>
