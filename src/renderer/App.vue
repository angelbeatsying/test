<template>
  <div id="app">
    <el-container :style="{'height':winHeight+'px'}">
      <el-aside :style="{'height':winHeight+'px'}">
        <el-menu :default-openeds="['1','2', '3']">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location-outline"></i>起始页面</template>
            <el-menu-item index="2-4-1">
              <router-link to='home'>欢迎页面</router-link>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>一键式报告</template>
            <el-menu-item index="2-4-1">
              <router-link to='report'>全部功能</router-link>
            </el-menu-item>
            <el-menu-item index="2-4-2">
              <router-link to='negativereport'>测试功能</router-link>
            </el-menu-item>
            <el-menu-item index="2-4-3">
              <router-link to='positivereport'>啥子功能</router-link>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-setting"></i>设置</template>
            <el-menu-item index="3-1">
              <router-link to='keyword'>关键字设置</router-link>
            </el-menu-item>
            <el-menu-item index="3-2">
              <router-link to='alarm'>报警设置</router-link>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container :style="{'height':winHeight+'px'}" class="main-content">
        <router-view></router-view>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "electron-vue-vpn",
  data() {
    return {
      winHeight: document.documentElement.clientHeight
    };
  },
  mounted() {
    //监听网络变化
    window.addEventListener("online", function() {
      console.log("有网络了");
    });
    window.addEventListener("offline", function() {
      const option = {
        title: "提示!",
        body: "网络已经断开，请检查您的网络设置!"
        //  icon: path.join('main-process/favicon2.ico')
      };
      const myNotification = new window.Notification(option.title, option);
      myNotification.onclick = () => {
        console.log("点击了");
      };
    });

    window.onresize = () => {
      this.winHeight = document.documentElement.clientHeight;
    };
  }
};
</script>

<style lang="scss">
/* CSS */
html,
body,
#app {
  height: 100%;
}
.el-aside {
  width: 200px !important;
  background: #eee;
  a {
    color: #333;
    display: block;
    text-decoration: none;
  }
  .el-menu {
    background: #eee;
  }
}
.el-container {
  // padding:10px;
  width: 100%;
}
.main-content {
  overflow-y: auto;
  overflow-x: hidden;
  padding: 10px;
}
.content {
  width: 100%;
}
//全局表格

.electron-table {
  border-collapse: collapse; //给表格设置合并边框模型
  width: 100%;
}
.electron-table tr td,
.electron-table tr th {
  height: 30px;
  line-height: 30px;
  border: 1px solid #eee;
  text-align: center;
  font-size: 14px;
  padding: 5px;
}

/*全局布局*/
.main_top {
  background: none repeat scroll 0 0 #fffced;
  border: 1px solid #fffced;
  line-height: 20px;
  padding: 10px;
  margin-bottom: 10px;
  overflow: hidden;
}
.page {
  text-align: center;
  margin-top: 20px;
}
.v-modal {
  opacity: 0.8 !important;
}
.router-link-active {
  color: rgba(255, 0, 0, 0.986) !important;
}
</style>
