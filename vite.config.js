import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
/************************************* 路径配置 start ********************************/
import { resolve } from 'path'

const pathResolve = (dir )=> {
  return resolve(__dirname, ".", dir)
}

const alias= {
  '@': pathResolve("src")
}
/************************************* 路径配置 end ********************************/
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base:'./',
  resolve: {  // ****************** 路径配置新增
    alias     // ****************** 路径配置新增
  },          // ****************** 路径配置新增
  /*server: {
    port: '3000',
    proxy: {
      '/napi': {
        target: 'https://api.jisuapi.com/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/napi/, '') // 不可以省略rewrite
      }
    }
  }*/
})