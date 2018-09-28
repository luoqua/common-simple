/* import BaiduMap from '@/components/baidu_map/demo/demo' */
import ColorPicker from '@/components/color_picker/index'
import Loading from '@/components/loading/demo/demo'
import Swipe from '@/components/swipe/demo/demo'
import TreeSelect from '@/components/tree_select/demo/demo'
import Index from '@/pages/layout/Layout'
import Editpage from '@/pages/page_edit'
import Input from '@/components/input'
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
				path: '/component/color_picker',
				component: ColorPicker,
				meta: {
					requireAuth: true,
					name: '颜色选择器'
				}
			},
			{
				path: '/component/loading',
				component: Loading,
				meta: {
					requireAuth: true,
					name: 'loading'
				}
			},
			{
				path: '/component/swipe',
				component: Swipe,
				meta: {
					requireAuth: true,
					name: '轮播图'
				}
			},
			{
				path: '/component/tree_select',
				component: TreeSelect,
				meta: {
					requireAuth: true,
					name: '树形菜单'
				}
			},
			{
				path: '/component/input',
				component: Input,
				meta: {
					requireAuth: true,
					name: '输入框'
				}
			}
		]
	}
]

export const dynamicRoutes = [
	{
		path: '',
		component: Index,
		meta: {
			requiresAuth: true,
			name: '首页'
		},
		children: []
	},
	{
		path: '/page',
		component: Editpage
	}

]


export default DynamicRoutes