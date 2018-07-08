<template>
	<el-menu class="navbar" mode="horizontal">
		<hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
		<breadcrumb></breadcrumb>
		<div class="right-menu">
			<!-- <lang-select class="international right-menu-item"></lang-select> -->
			<div style="vertical-align:text-bottom;" class="right-menu-item">
				<el-button v-show="this.language==='en'" @click="handleSetLanguage('zh')" type="text">中文</el-button>
				<el-button v-show="this.language==='zh'" @click="handleSetLanguage('en')" type="text">English</el-button>
			</div>
			<!-- <el-color-picker v-model="theme"></el-color-picker> -->

			<span style="vertical-align:text-bottom;" class="right-menu-item">{{name}}</span>
			<el-dropdown class="avatar-container right-menu-item" trigger="click">
				<div class="avatar-wrapper">
					<img class="user-avatar" src="https://s3.cn-north-1.amazonaws.com.cn/guzzu-cn-assets-1/images/7eae2145-a4c2-49d5-b179-2e09596b9252-medium.jpg">
					<i class="el-icon-caret-bottom"></i>
				</div>
				<el-dropdown-menu class="user-dropdown" slot="dropdown">
					<el-dropdown-item divided>
						<span @click="logout" style="display:block;">LogOut</span>
					</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
	</el-menu>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import LangSelect from "@/components/LangSelect";
export default {
  components: {
    Breadcrumb,
    Hamburger,
    LangSelect
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["sidebar", "avatar", "name"]),
    theme: {
      get() {
        return this.themeColor;
      },
      set(val) {
        this.$store.dispatch("setThemeColor", val);
      }
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("ToggleSideBar");
      // 禁止缩放
    },
    logout() {
      this.$store.dispatch("LogOut").then(() => {
        location.reload(); // 为了重新实例化vue-router对象 避免bug
      });
    },
    shoppingmallSel() {
      this.$router.push({ path: "/shoppingmallList" });
    },
    handleSetLanguage(lang) {
      this.$i18n.locale = lang;
      this.$store.dispatch("setLanguage", lang);
      this.$message({
        message: "switch language success",
        type: "success"
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international {
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>

