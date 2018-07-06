<template>
	<div>
		<component :block="block" v-bind:is="block.type|titlefilter"></component>
	</div>
</template>

<script>
import axios from 'axios'
import cell from './components/cell'
import swiper from './components/swiper'
import spacer from './components/spacer'
import navgroup from './components/navgroup'
import celltitle from './components/title'
import product from './components/product'
export default {
	props: {
		block: {
			type: Object,
		}
	},
	components: {
		cell,
		banner: swiper,
		spacer,
		navgroup,
		celltitle,
		productgroup: product
	},
	filters: {
		titlefilter(val) {
			if (val === 'title') {
				return 'celltitle'
			}
			return val;
		}
	}
}
</script>

<style lang="scss" scoped>

</style>
