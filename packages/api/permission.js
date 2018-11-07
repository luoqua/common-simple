import axios from '@/config/httpConfig'
import {aliUrl} from '@/config/baseUrl'

export function fetchPermission() {
	return axios.get('/packages/utils/permission.json')
}

export function login() {
	return axios.get('/packages/utils/login.json')
}

// 获取上传服务器签名
export function getSignature() {
	return axios.get('/packages/utils/signature.json')
}
// 阿里云上传接口
export function upload(formData) {
	return axios.trdapi(aliUrl,formData)
}

// 测试的获取轮播图接口
export function getImg() {
	return axios.get('/api/getImgurl')
}