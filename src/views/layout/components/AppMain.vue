<template>
  <div>
    <transition name="fade" mode="out-in">

      <div v-show="$route.meta.backIcon" class="back">
        <i @click="_goBack" class="el-icon-back"></i>
      </div>
    </transition>
    <section class="app-main">

      <transition name="fade" mode="out-in">
        <!-- <router-view :key="key"></router-view> -->
        <!-- <el-tabs class="contain" v-model="activeName" @tab-click="handleClick" type="border-card">
				<el-tab-pane name="zh" label="中文">
				</el-tab-pane>
				<el-tab-pane name="en" label="English">
				</el-tab-pane>
			</el-tabs> -->
        <div class="tabs">

          <!-- <div class="tab">
						<span :class="{'active-first':'en'===editlang}" @click="setLang('en')">English</span>
						<span :class="{'active':'zh'===editlang}" @click="setLang('zh')">中文</span>
					</div> -->
          <router-view></router-view>
        </div>

      </transition>
    </section>
  </div>

</template>

<script>
export default {
  name: "AppMain",
  computed: {
    // key() {
    //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    // }
  },

  data() {
    return {};
  },
  methods: {
    setLang(lang) {
      this.$store.dispatch("setEditlang", lang);
    },
    _goBack() {
      if (this.$route.meta.title === "PAGE") {
        this.$router.push({ path: "/pages" });
      } else {
        this.goBack();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.back {
  font-size: 30px;
  font-weight: 700;
  padding: 10px;
  i {
    cursor: pointer;
  }
}
.app-main {
  margin: 10px 10px 50px 10px;
  box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.2);

  .tabs {
    .tab {
      border-left-color: #dcdfe6;
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #e4e7ed;
      width: 100%;
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
        &:hover {
          color: rgb(64, 158, 255);
        }
      }
      .active {
        background: #fff;
        border-left-color: #dcdfe6;
        border-right-color: #dcdfe6;
        color: rgb(64, 158, 255);
        border-left: 1px solid rgba(0, 0, 0, 0.2);
        border-right: 1px solid rgba(0, 0, 0, 0.2);
      }
      .active-first {
        background: #fff;
        border-left-color: #dcdfe6;
        border-right-color: #dcdfe6;
        color: rgb(64, 158, 255);
        border-right: 1px solid rgba(0, 0, 0, 0.2);
      }
    }
  }
}
</style>

