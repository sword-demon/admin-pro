import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
// 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 配置路由
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: {},
        children: []
    }
]
const router = createRouter({
    // 哈希路由
    history: createWebHashHistory(),
    routes
})

router.beforeEach(async (_to, _from, next) => {
    NProgress.start()
    next()
})

router.afterEach((_to) => {
    NProgress.done()
})


export default router;