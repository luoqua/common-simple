/* entry-client.js */
import createApp from '../packages/main2.js'

const app = createApp()

// 同步服务端信息
if (window.__INITIAL_STATE__) {
	app.$store.replaceState(window.__INITIAL_STATE__)
}

// 绑定app根元素
window.onload = function() {
	app.$mount('#app')
}
