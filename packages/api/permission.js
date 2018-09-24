import axios from '@/config/httpConfig'

export function fetchPermission() {
	return axios.get('/packages/utils/permission.json')
}

export function login() {
	return axios.get('/packages/utils/login.json')
}