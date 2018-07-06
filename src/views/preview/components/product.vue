<template>
	<div>

		<!-- <div v-if="block.source!=='product'||block.items.length===0" class="product" :class="[block.template]">
			<div v-for="i in 4" :key="i" class="item">
				<div class="img" :style="'background-image:url('+imgsrc+')'">
				</div>
				<div class="info">
					<h5 class="title">此处显示商品名称</h5>
					<h6 class="price">￥999.00</h6>
				</div>
			</div>
		</div> -->

		<div class="product" :class="[block.template]">
			<div v-for="(item,i) in block.items" :key="i" class="item">

				<div class="img" :style="'background-image:url('+_(item,'image.url')+')'">
				</div>
				<div class="info">
					<h5 class="title">{{_(item,'name')}}</h5>
					<h6 class="price">￥{{item.price/100}}</h6>
				</div>
			</div>

		</div>

	</div>
</template>

<script>
import axios from 'axios'
export default {
	// mounted() {
	// 	console.log(this.block);
	// 	if (this.block.source === 'shoppingMallCategory') {
	// 		this.productsGet();
	// 	}
	// },
	props: {
		block: {
			type: Object,
		}
	},
	data() {
		return {
			imgsrc: 'https://img.yzcdn.cn/public_files/2018/01/30/585dae8447d80013ef9344adc973c6ee.png?imageView2/2/w/520/h/0/q/75/format/webp',
		}
	},
	methods: {
		productsGet() {
			axios.get(`https://mp-dev.guzzu.cn/v3/frontapi/shopping-malls/${this.shoppingMallId}/categories/${this.block.shoppingMallCategory}/products`).then(res => {
				console.log(res.data);
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.product {
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  justify-content: flex-start;
  .item {
    margin-bottom: 5px;
    padding: 0 5px;
    box-sizing: border-box;
    .img {
      // flex-basis: 50%;
      position: relative;
      height: 0;
      padding-bottom: 100%;
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
      img {
        width: 100%;
      }
    }
    .info {
      font-size: 14px;
      .title {
        line-height: 14px;
        min-height: 14px;
        max-height: 28px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        word-wrap: break-word;
      }
    }
    h6 {
      color: red;
      font-size: 14px;
      margin: 3px 0;
    }
  }
  .onspace {
    padding: 0;
  }
}
.nospace {
  .item {
    padding: 0;
  }
}
.single {
  :nth-child(n) {
    flex-basis: 100%;
  }
}
.double {
  :nth-child(n) {
    flex-basis: 50%;
  }
}
.triple {
  :nth-child(n) {
    flex-basis: 33.33%;
  }
}
.onebig {
  :nth-child(n) {
    flex-basis: 50%;
  }
  :nth-child(3n + 1) {
    flex-basis: 100%;
  }
}
.list {
  padding: 10px 20px;
  .item {
    flex-basis: 100%;
    padding: 0 70% 0 0;
    position: relative;
    .info {
      position: absolute;
      left: 35%;
      top: 0;
      bottom: 0;
      right: 0;
      padding: 10px;
      text-align: left;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
}
</style>
