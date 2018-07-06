<template>
	<div v-if="title!==''" class="editor-page">
		<div class="tab">
			<span :class="{'active':'en'===editlang}" @click="setLang('en')">English</span>
			<span :class="{'active':'zh'===editlang}" @click="setLang('zh')">中文</span>
		</div>
		<h4>{{$t(title)}}</h4>

		<!-- <h6>
			<span :class="{'active':editlang==='en'}" @click="setlang('en')">EN</span>
			<span :class="{'active':editlang==='zh'}" @click="setlang('zh')">中</span>
		</h6> -->
		<component class="edit" :class="{'onedit':onEdit}" :storesData="storesData" :block="block" v-bind:is="block.type+'Editor'"></component>
	</div>
</template>

<script>
import cellEditor from '@/edit/cellEditor'
import titleEditor from '@/edit/titleEditor'
import swiperEditor from '@/edit/swiperEditor'
import spacerEditor from '@/edit/spacerEditor'
import productgroupEditor from '@/edit/productEditor'
import navgroupEditor from '@/edit/navgroupEditor'
import headerEditor from '@/edit/headerEditor'
import { doPost, doGet } from '@/api/api'

export default {
	props: {
		block: {
			type: Object,
		},
		onEdit: {
			type: Boolean,
		}
	},
	mounted() {
		this.shoppingmallStoresGet();
	},
	data() {
		return {
			storesData: {
				storesList: [],
				storeId: '',
			}
		}
	},
	methods: {
		setLang(lang) {
			this.$store.dispatch('setEditlang', lang)
		},

		shoppingmallStoresGet() {
			doGet(`shopping-malls/${this.shoppingMallId}/stores`, { p: 0 }).then(res => {
				this.storesData = {
					storesList: res.data,
					storeId: res.data[0]['_id'],
				}
			})
		}
	},
	computed: {
		title() {
			let title = '';
			switch (this.block.type) {
				// case 'cell': title = '导航条'; break;
				case 'productgroup': title = 'BTN_PRODUCTGROUP'; break;
				case 'spacer': title = 'BTN_SPACER'; break;
				case 'banner': title = 'BTN_BANNER'; break;
				case 'title': title = 'BTN_TITLE'; break;
				case 'navgroup': title = 'BTN_NAVGROUP'; break;
				case 'header': title = 'BTN_HEADER'; break;

			}
			return title;
		}
	},
	components: {
		cellEditor,
		spacerEditor,
		productgroupEditor,
		bannerEditor: swiperEditor,
		navgroupEditor,
		titleEditor,
		headerEditor
	},

}
</script>

<style lang="scss" scoped>
.editor-page {
  min-width: 400px;
  // padding: 10px;
  border: 1px solid #e5e5e5;
  background: #f8f8f8;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;

  position: relative;
  .tab {
    // box-sizing: border-box;
    position: absolute;
    left: -1px;
    top: -40px;
    right: -1px;
    border: 1px solid #e5e5e5;
    border-top: none;
    background: #dcdfe6;
    border-left-color: #dcdfe6;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #e4e7ed;
    font-size: 0;
    span {
      font-size: 16px;
      text-align: center;
      width: 80px;
      display: inline-block;
      border-left-color: #dcdfe6;
      border-right-color: #dcdfe6;
      // border-bottom: 1px solid #e4e7ed;
      box-sizing: border-box;
      cursor: pointer;
    }
    .active {
      background: #f8f8f8;
      // border-left: 1px solid #dcdfe6;
      border-right: 1px solid #dcdfe6;
      border-top: 1px solid #e4e7ed;
      color: rgb(64, 158, 255);
    }
  }
  &:before {
    right: 100%;
    top: 20px;
    border: solid #000;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-color: transparent;
    border-right-color: #e5e5e5;
    border-width: 7px;
    margin-top: -7px;
  }
  &:after {
    right: 100%;
    top: 20px;
    border: solid #000;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-color: transparent;
    border-right-color: #f8f8f8;
    border-width: 6px;
    margin-top: -6px;
  }
  h4 {
    font-size: 16px;
    padding: 5px 0;
    border-bottom: 1px solid #999;
    margin: 5px;
  }
  h6 {
    position: absolute;
    right: 0;
    top: 0;
    display: flex;
    border: 1px solid red;
    justify-content: space-around;
    text-align: center;
    span {
      display: block;
      padding: 5px;
      width: 30px;
      cursor: pointer;
    }
    .active {
      background: #3f8;
    }
  }
  .edit {
    padding: 10px;
  }
}
</style>
