// 导出一个工厂函数，用于创建新的vue实例
import Vue from 'vue'
import createRouter from '@/router/router_ssr'
import App from './App'
import createStore from './store/index.js'

export default function createApp() {
	const store = createStore()
	const router = createRouter()
	const app = new Vue({
		router,
		store,
		render: h => h(App)
	})

	return app
}