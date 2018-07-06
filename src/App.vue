<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	name: 'app',
	mounted() {
		this.$i18n.locale = this.language
	},
}
</script>
