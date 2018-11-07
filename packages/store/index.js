import Vue from 'vue'
import Vuex from 'vuex'
import {getImg} from '@/api/permission'

Vue.use(Vuex)

export default function createStore() {
	let store = new Vuex.Store({
		state: {
			imgUrls: []
		},
		actions: {
			getimgUrls({ commit }) {
				return getImg().then((data) => {
					commit('setimgUrls',data)
				})
			}
		},
		mutations: {
			setimgUrls(state, res) {
				state.imgUrls = res
			}
		}

	})

	return store
}

