import Vue from 'vue'
import Router from 'vue-router'
/* import BaiduMap from '@/components/baidu_map/demo/demo' */
import ColorPicker from '@/components/color_picker/index'
import Loading from '@/components/loading/demo/demo'
import Swipe from '@/components/swipe/demo/demo'
import TreeSelect from '@/components/tree_select/demo/demo'
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
