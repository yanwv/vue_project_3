<template>
  <div id="app">
    <Header></Header>
    <router-view />
    <!-- home search显示 登录注册隐藏 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: "",
  components: {
    Header,
    Footer,
  },
  mounted() {
    // 通知vuex发请求获取数据存储在仓库中
    this.$store.dispatch("getCategoryList");
  },
};
</script>

<style lang="less">
</style>
