<template>
	<div class="carousel-wrap" id="carousel">
		<img style="width:100%;z-index:-1;opacity:0" :src="slideList[0].image" alt="">
		<transition-group tag="ul" class='slide-ul' name="list">
			<li v-for="(list,index) in slideList" :key="index" v-show="index===currentIndex" @mouseenter="stop" @mouseleave="go">
				<a :href="list.clickUrl">
					<img :src="list.image" :alt="list.desc">
				</a>
			</li>
		</transition-group>
		<div class="carousel-items">
			<span v-for="(item,index) in slideList.length" :key="index" :class="{'active':index===currentIndex}" @mouseover="change(index)"></span>
		</div>
	</div>
</template>

<script>
export default {
	// el: '#carousel',
	data() {
		return {
			slideList: [
				{
					"clickUrl": "#",
					"desc": "nhwc",
					"image": "https://s3.cn-north-1.amazonaws.com.cn/guzzu-cn-assets-1/images/06c55e8e-4e21-4a63-940f-9f1f5332538e-medium.jpg"
				},
				{
					"clickUrl": "#",
					"desc": "hxrj",
					"image": "http://cdn.iciba.com/news/word/big_20180417b.jpg"
				},
				{
					"clickUrl": "#",
					"desc": "rsdh",
					"image": "https://s3.cn-north-1.amazonaws.com.cn/guzzu-cn-assets-1/images/06c55e8e-4e21-4a63-940f-9f1f5332538e-medium.jpg"
				}
			],
			currentIndex: 0,
			timer: ''
		}	
	},
	methods: {
		go() {
			this.timer = setInterval(() => {
				this.autoPlay()
			}, 4000)
		},
		stop() {
			clearInterval(this.timer)
			this.timer = null
		},
		change(index) {
			this.currentIndex = index
		},
		autoPlay() {
			this.currentIndex++
			if (this.currentIndex > this.slideList.length - 1) {
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
		top:0;
    position: absolute;
    width: 100%;
    height: 100%;
		display: flex;
			align-items:center;/*指定垂直居中*/
    img {
      width: 100%;
      // height: 100%;
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
		width:6px;
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
