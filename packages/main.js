// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import { Menu, Submenu, MenuItem, MenuItemGroup, Dropdown, DropdownMenu, DropdownItem } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/base.css'
import '@/styles/common.scss'
import { fetchPermission } from '@/api/permission'
import UserToken,{ store, recursionRouter } from '@/store/store'
import DynamicRoutes,{dynamicRoutes} from '@/router/index_init'

import Vue from 'vue'
import App from './App'
import router from './router'
import './icons/iconfont.css'

Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 }
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Dropdown)
Vue.use(MenuItemGroup)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.config.productionTip = false


router.beforeEach((to, from, next) => {

	if (!UserToken) {
		if (to.mactched.length > 0 && !to.mactched.some(record => record.meta.requireAuth)) {
			next()
		} else {
			next({ path: '/login'})
		}
	} else if (store.state.permissionList.length === 0) {

		let permissionList = fetchPermission()

		permissionList.then(function(data) {

			let routes = recursionRouter(data,DynamicRoutes)
			let MainContainer = dynamicRoutes.find(v => v.path === '')
			let children = MainContainer.children
			let initialRoutes = router.options.routes

			children.push(...routes)

			router.addRoutes(dynamicRoutes)

			store.state.permissionList.push(...initialRoutes,...dynamicRoutes)

			next({ path: to.path })

		},function(err) {
			console.log(err)
			next()
		})
	} else if (to.path !== '/login') {
		next()
	} else {
		next(from.fullPath)
	}

})
/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: { App },
	template: '<App/>'
})
