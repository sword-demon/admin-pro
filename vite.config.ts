import { fileURLToPath } from 'url'
import { defineConfig, loadEnv } from 'vite'
import type { UserConfig, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
    // 获取当前工作目录
    const root = process.cwd()
    // 获取环境变量
    const env = loadEnv(mode, root)
    console.log(env)

    return {
        // 项目根目录
        root,
        // 项目部署的基础路径
        base: './',
        publicDir: fileURLToPath(new URL('./public', import.meta.url)), // 无需处理的静态资源的位置
        assetsInclude: fileURLToPath(new URL('./src/assets/', import.meta.url)), // 需要处理的静态资源的位置
        plugins: [
            // Vue 模版文件编译插件
            vue(),
            // jsx 文件编译插件
            vueJsx()
        ],
        // 运行后本地预览的服务器
        server: {
            // 是否开启 https
            // https: {
            //     key: fs.readFileSync('./path/to/server.key'),
            //     cert: fs.readFileSync('./path/to/server.crt')
            // },
            // https: false,
            // 指定服务应该监听哪个 ip 地址，如果设置为 0.0.0.0 或 true 则监听所有地址，包括局域网和公网地址
            host: true,
            // 开发环境预览的服务器端口号
            port: 9155,
            // 启动后是否自动打开浏览器
            open: false,
            // 是否开启 CORS 跨域
            cors: true,
            // 代理服务器
            proxy: {
                // 这里的意思是以 /api 开头的发送的请求都会被转发到 https://xxx:9000
                [env.VITE_APP_API_BASEURL]: {
                    target: 'http://localhost:9155',
                    // 改变 host header
                    changeOrigin: true,
                    // 重写路径
                    // rewrite: (path) => path.replace(/^\/api/, '')
                },
                // mock 请求服务
                [env.VITE_APP_MOCK_BASEURL]: {
                    target: 'http://localhost:9000',
                    changeOrigin: true,
                    // rewrite: (path) => path.replace(/^\/mock/, '')
                }
            }
        },
        // 打包配置
        build: {
            // 关闭 sourcemap 报错不会映射到源码
            sourcemap: false,
            // 打包大小超出 400kb 提示警告
            chunkSizeWarningLimit: 400,
            rollupOptions: {
                // 打包入口文件 根目录下的 index.html
                // 也就是项目从哪个文件开始打包
                input: {
                    index: fileURLToPath(new URL('./index.html', import.meta.url))
                },
                // 静态资源分类打包
                output: {
                    format: 'esm',
                    chunkFileNames: 'static/js/[name]-[hash].js',
                    entryFileNames: 'static/js/[name]-[hash].js',
                    assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
                }
            }
        },
        // 配置别名
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
                '#': fileURLToPath(new URL('./types', import.meta.url))
            }
        }
    }
})