<template>
	<div class="cell">
		<div class="left">{{block.left}} </div>
		<div class="right">
			{{block.right}}
		</div>
				<div class="center">
			<span>
				{{block.center}}
			</span>
			</div>
		<span class="islink" v-if="block.islink">
			<i class="el-icon-arrow-right"></i>
		</span>
	</div>
</template>

<script>
export default {
	props:{
		block:{
			type:Object,
		},
	},
	data(){
		return{
			left:'',
			right:'',
			center:'',
			islink:false,
		}
	}
}
</script>

<style lang="scss" scoped>
.cell{
	height: 25px;
	line-height: 25px;
	padding:5px 20px 5px 10px;
	border-top:1px solid #aaa;
	border-bottom: 1px solid #aaa;
	text-align: center;
	position: relative;
	div{
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
		word-wrap: break-word;
	}

	.left{
		text-align: left;
		float: left;
		width:80px;
		overflow: hidden;
	}
	.center{
		margin-left:80px;
		margin-right:80px;
	}
	.right{
		text-align: right;
		width:80px;
		float: right;
		overflow: hidden;
	}
	.islink{
		position: absolute;
		right:8px;
		top:5px;
	}
	.edit{
		position: absolute;
		left:102%;
		top:0;
		width:300px;
		height: 200px;
		padding:10px;
		border:1px solid #000;
		.row{
			display: block;
			margin:5px auto;
			font-size:14px;
			height: 20px;
			line-height: 20px;
			label{
				float: left;
				margin:0 5px;
			}
			input{
				float: left;
			}
		}
	}
}


</style>
