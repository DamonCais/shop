<template>
	<div class="carousel-wrap" id="carousel">
		<img style="width:100%;z-index:-1;opacity:0" :src="_(block.items[0],'image.url')" alt="">
		<transition-group tag="ul" class='slide-ul' name="list">
			<li v-for="(item,index) in block.items" :key="index" v-show="index===currentIndex" @mouseenter="stop" @mouseleave="go">
				<div :class="block.template" :style="'background-image:url('+_(item,'image.url')+')'">
				</div>
			</li>
		</transition-group>
		<div class="carousel-items">
			<span v-for="(item,index) in block.items.length" :key="index" :class="{'active':index===currentIndex}" @mouseover="change(index)"></span>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		block: {
			type: Object,
		}
	},
	data() {
		return {
			currentIndex: 0,
			timer: ''
		}
	},
	methods: {
		go() {
			// this.timer = setInterval(() => {
			// 	this.autoPlay()
			// }, 4000)
		},
		stop() {
			// clearInterval(this.timer)
			// this.timer = null
		},
		change(index) {
			this.currentIndex = index
		},
		autoPlay() {
			this.currentIndex++
			if (this.currentIndex > this.block.items.length - 1) {
				this.currentIndex = 0
			}
		}
	},
	created() {
		this.$nextTick(() => {
			this.timer = setInterval(() => {
				this.autoPlay()
			}, 4000)
		})
	}
}
</script>

<style lang="scss" scoped>
.carousel-wrap {
  position: relative;
  // height: 120px;
  width: 100%;
  overflow: hidden;
  // 删除
  background-color: #fff;
}

.slide-ul {
  width: 100%;
  height: 100%;
  li {
    top: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center; /*指定垂直居中*/
    .swiper {
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
    }
    .nospace {
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
    }
    .haspace {
      width: 100%;
      height: 100%;
      background-size: 100%;
      background-position: center center;
      background-repeat: no-repeat;
    }
  }
}

.carousel-items {
  position: absolute;
  z-index: 10;
  bottom: 0;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  font-size: 0;
  span {
    display: inline-block;
    height: 6px;
    // width: 30px;
    width: 6px;
    border-radius: 50%;
    margin: 0 3px;
    background-color: #b2b2b2;
    cursor: pointer;
  }
  .active {
    background-color: #333;
  }
}
.list-enter-to {
  transition: all 1s ease;
  transform: translateX(0);
}

.list-leave-active {
  transition: all 1s ease;
  transform: translateX(-100%);
}

.list-enter {
  transform: translateX(100%);
}

.list-leave {
  transform: translateX(0);
}
</style>
