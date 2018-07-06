<template>
	<div>
		<section v-if="hasimage" class="navgroup">
			<div class="imgs" v-for="(item,index) in block.items" :key="index">
				<div class="img" :style="'background-image:url('+_(item,'image.url')+')'">
					<img v-if="index===0" :src="_(item,'image.url')" alt="">
				</div>
			</div>
		</section>
		<section v-if="hastext" class="navgroup">
			<div class="titles" v-for="(item,index) in block.items" :key="index">
				<h5>{{item.title[editlang]}}</h5>
			</div>
		</section>
	</div>
</template>

<script>
export default {
	props: {
		block: {
			type: Object,
		}
	},
	computed: {
		hasimage() {
			return this.block.template !== 'text-only'
		},
		hastext() {
			return this.block.template !== 'image-only'
		},
	},

}
</script>

<style lang="scss" scoped>
.navgroup {
  display: flex;
  .titles {
    flex: 1;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    word-wrap: break-word;
    text-align: center;
    line-height: 20px;
  }
  .imgs {
    flex: 1;
    line-height: 15px;
    position: relative;
    box-sizing: border-box;
    // padding:5px;
    // padding-bottom:20px;
    .img {
      width: 100%;
      height: 100%;
      border: 3px solid #fff;
      box-sizing: border-box;
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
    }
    img {
      width: 100%;
    }
  }
}
</style>
