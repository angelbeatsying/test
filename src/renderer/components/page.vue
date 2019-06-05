<template>
  <div>
    <div class="fake-title-bar" v-if="platform==='win32'">
      <div class="handle-bar">
        <!-- 如果是windows系统 就加上模拟的操作按钮-->
        <i class="el-icon-minus" @click="minimizeWindow"></i>
        <i class="el-icon-close" @click="closeWindow"></i>
      </div>
    </div>
    <system-information></system-information>
  </div>
</template>

<script>
import systemInformation from './LandingPage/SystemInformation'
export default {
  name: "landing-page",
  components: { systemInformation },
  data() {
    return {
      platform: require("os").platform()
    };
  },
  methods: {
    minimizeWindow() {
      const win = this.$electron.remote.BrowserWindow.getFocusedWindow();
      win.minimize();
    },
    closeWindow() {
      const win = this.$electron.remote.BrowserWindow.getFocusedWindow();
      win.close();
    }
  },
  mounted() {}
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: "Source Sans Pro", sans-serif;
}
.fake-title-bar {
  -webkit-app-region: drag;
  .handle-bar {
    -webkit-app-region: no-drag;
  }
}

</style>
