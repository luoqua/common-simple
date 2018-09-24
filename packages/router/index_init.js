/* import BaiduMap from '@/components/baidu_map/demo/demo' */
import ColorPicker from '@/components/color_picker/index'
import Loading from '@/components/loading/demo/demo'
import Swipe from '@/components/swipe/demo/demo'
import TreeSelect from '@/components/tree_select/demo/demo'
import Index from '@/pages/layout/Layout'


/* export const DynamicRoutes = [
	{
		path: '',
		component: Layout,
		name: 'layout',
		meta: {
			requireAuth: true,
			name: '首页'
		},
		children: []
	}
] */

const DynamicRoutes = [
	{
		path: '/component',
		name: 'component',
		component: Index,
		meta: {
			requireAuth: true,
			name: '组件'
		},
		children: [
			{
				path: '/color_picker',
				component: ColorPicker,
				meta: {
					requireAuth: true,
					name: '颜色选择器'
				}
			},
			{
				path: '/loading',
				component: Loading,
				meta: {
					requireAuth: true,
					name: 'loading'
				}
			},
			{
				path: '/swipe',
				component: Swipe,
				meta: {
					requireAuth: true,
					name: '轮播图'
				}
			},
			{
				path: '/tree_select',
				component: TreeSelect,
				meta: {
					requireAuth: true,
					name: '树形菜单'
				}
			}

		]
	}
]

export const dynamicRoutes = [
	{
		path: '',
		component: Index,
		redirect: 'home',
		meta: {
			requiresAuth: true,
			name: '首页'
		},
		children: []
	}

]


export default DynamicRoutes