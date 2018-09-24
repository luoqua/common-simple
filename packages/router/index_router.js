import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/SuperAdmin.vue'


Vue.use(Router)

export default new Router({
	routes: [
		// 重定向到登陆页
		{
			path: '/',
			redirect: '/login'
		},
		// 登录页
		{
			path: '/login',
			name: 'Login',
			component: Login
		}
	]
})