import Vue from 'vue'
import textTitle from '@/components/text_title/demo'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default function createRouter() {
	let router = new VueRouter({
		mode: 'history',
		routes: [
			{
				path: '/test' ,
				component: textTitle
			}
		]
	})

	return router
}