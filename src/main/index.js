'use strict'

import { app, BrowserWindow, Tray, Menu, dialog, ipcMain } from 'electron'
import pkg from '../../package.json'
import { createTray } from './model/tray'

// 关闭安全警告
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
// 开发模型走webpack-dev-server的url
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  const options = {
    height: 500,
    width: 900,
    center: true,
    autoHideMenuBar: false,
    // useContentSize: true,
    // frame: false, // 是否创建frameless窗口, 自定义顶部工具栏
    fullscreenable: false, // 是否允许全屏
    resizable: true, // 是否允许拉伸大小
    webPreferences: {
      nodeIntegration: true, // 解决electron 5.0版Node默认非法bug
      nodeIntegrationInWorker: true,
      backgroundThrottling: false // 当页面被置于非激活窗口的时候是否停止动画和计时器
    }
  }

  if (process.platform === 'win32') { // 针对windows平台做出不同的配置
    options.show = true // 创建即展示
    options.frame = false // 创建一个frameless窗口
    options.backgroundColor = '#3f3c37' // 背景色
  }

  mainWindow = new BrowserWindow(options)

  mainWindow.loadURL(winURL)

  // 去掉顶部菜单window下
  mainWindow.setMenu(null)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  createTray()
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
