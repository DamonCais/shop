<template>
	<div class="contain">
		<div class="pic">
			<ul class="category-head">
				<li><img src="https://img.yzcdn.cn/public_files/2018/01/30/585dae8447d80013ef9344adc973c6ee.png?imageView2/2/w/520/h/0/q/75/format/webp" alt=""></li>
				<li><img src="https://img.yzcdn.cn/public_files/2018/01/30/585dae8447d80013ef9344adc973c6ee.png?imageView2/2/w/520/h/0/q/75/format/webp" alt=""></li>
				<li><img src="https://img.yzcdn.cn/public_files/2018/01/30/585dae8447d80013ef9344adc973c6ee.png?imageView2/2/w/520/h/0/q/75/format/webp" alt=""></li>
				<li><img src="https://img.yzcdn.cn/public_files/2018/01/30/585dae8447d80013ef9344adc973c6ee.png?imageView2/2/w/520/h/0/q/75/format/webp" alt=""></li>
				<li><img src="https://img.yzcdn.cn/public_files/2018/01/30/585dae8447d80013ef9344adc973c6ee.png?imageView2/2/w/520/h/0/q/75/format/webp" alt=""></li>
				<li><img src="https://img.yzcdn.cn/public_files/2018/01/30/585dae8447d80013ef9344adc973c6ee.png?imageView2/2/w/520/h/0/q/75/format/webp" alt=""></li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.contain {
  // width: 1000px;
  margin: 10px;
  min-height: 300px;
  background: #fff;
  padding: 20px 100px;
  box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.2);
}
.category-head {
  width: 320px;
  display: inline;
  white-space: nowrap; /*规定段落中的文本不进行换行*/
  overflow-x: scroll; /*水平方向，超出部分添加滚动机制*/
  float: left; /*一定要设置左侧浮动*/
  overflow-y: hidden; /*竖直方向，超出部分隐藏*/
  li {
    margin-top: 10px;
    display: inline-block; /*既可以水平排列，又可以设置宽高和边距*/
    img {
      width: 100px;
      height: 100px;
    }
  }
}
</style>
