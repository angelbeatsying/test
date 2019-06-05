import low from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import path from 'path'
import fs from 'fs-extra'
import { app, remote } from 'electron'

const env = process.type === 'main' ? app : remote.app 

const STORE_PATH = env.getPath('userData') // 获取electron应用的用户目录

console.log(STORE_PATH)
// 解决生产环境下的问题
if (process.type !== 'renderer') {
  if (!fs.pathExistsSync(STORE_PATH)) { // 如果不存在路径
    fs.mkdirpSync(STORE_PATH) // 就创建
  }
}

const adapter = new FileSync(path.join(STORE_PATH, '/data.json'))

const db = low(adapter) // lowdb接管该文件

export default db // 暴露出去