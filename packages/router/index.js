import Vue from 'vue'
import Router from 'vue-router'
/* import BaiduMap from '@/components/baidu_map/demo/demo' */

import Index from '@/pages/layout/Layout'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'index',
			component: Index
		}
	]
})
