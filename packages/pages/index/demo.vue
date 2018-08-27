<template>
	<section >
		<tree-select
			:items="items"
			@onGetOptions="onGetOptions"
		/>
		<baidu-map
		:centerPoint = "centerPoint"
		:zoomScale = "zoomScale"
		@initData = "initData"
		@moveOrZoom = "moveOrZoom"
		v-if="flag" />
	</section>
</template>

<script>
import { Fetch } from '@/utils/common.js'
import treeSelect from '@/components/tree_select/index.vue'
import baiduMap from '@/components/baidu_map/index.vue'
import BaiduMap from 'BaiduMap'

export default {
	data() {
		return {
			data: [{
				group1: '区域',
				group2: '按区域',
				area1: [{
					text: '全部',
					id: 1001
				}, {
					text: '附近',
					id: 1002
				}, {
					text: '滨湖区',
					id: 1003
				}, {
					text: '新吴区',
					id: 1004
				}, {
					text: '锡山区',
					id: 1004
				}, {
					text: '宜兴市',
					id: 1004
				}, {
					text: '江阴市',
					id: 1004
				}, {
					text: '梁溪区',
					id: 1004
				}, {
					text: '常州市',
					id: 1004
				}]
			},
			{
				group1: '面积',
				area1: [{
					text: '不限',
					id: 1001
				}, {
					text: '80-90㎡',
					id: 1002
				}, {
					text: '90-100㎡',
					id: 1003
				}, {
					text: '100-110㎡',
					id: 1004
				}, {
					text: '110-120㎡',
					id: 1004
				}, {
					text: '120-130㎡',
					id: 1004
				}, {
					text: '130-140㎡',
					id: 1004
				}, {
					text: '140-180㎡',
					id: 1004
				}]
			},
			{
				group1: '类型',
				area1: [{
					text: '在建工地',
					id: 1001
				}, {
					text: '完工工地',
					id: 1002
				}]
			},
			{
				group1: '更多',
				area1: [{
					text: '在建工地',
					id: 1001
				}, {
					text: '完工工地',
					id: 1002
				}]
			}
			],
			nav_index: 5,
			initPoint: {},
			zoomScale: 16,
			centerPoint: '',
			flag: false,
			resultLatLng: '',
			filter_options: {},
			bs: '',
			search_options: ''
		}
	},
	created() {
		this.getLocation()
	},
	mounted() {

	},
	components: {
		treeSelect,
		baiduMap
	},
	watch: {
		initPoint() {
			this.centerPoint = this.initPoint
		},
		bs() {
			let bssw = this.bs.getSouthWest() // 可视区域左下角
			let bsne = this.bs.getNorthEast() // 可视区域右上角

			this.get_site_data_lat(bssw,bsne)
		},
		search_options() {
			let that = this

			Object.keys(this.search_options).forEach(function(key) {
				if (key === '面积') {


					that.search_options[key].text !== '不限' ? that.regxArea(key) : that.filter_options.area = []


				} else if (key === '区域') {

					let myGeo = new BaiduMap.Geocoder()

					if (that.search_options[key].text === '全部') {
						that.search_options[key].text = '无锡市'
					}
					myGeo.getPoint(that.search_options[key].text, function(pointAddress) {

						let point = new BaiduMap.Point(pointAddress.lng,pointAddress.lat)		// 创建中心点坐标


						that.map.centerAndZoom(point,13)							// 初始化地图，设置中心点坐标和地图级别

						that.bs = that.map.getBounds()

					}, '无锡市')
				} else if (key === '类型') {
					let bssw = that.bs.getSouthWest() // 可视区域左下角
					let bsne = that.bs.getNorthEast() // 可视区域右上角

					that.search_options[key].text === '完工工地' ?
						that.FetchData(bssw,bsne,'http://192.168.1.161:3000/get_site_data_lat') :
						that.FetchData(bssw,bsne)
				}
			})

		}
	},
	computed: {
		items() {
			let itemsData = this.data
			let OitemsField = [
			        'text',
			        'type',
			        'menu_index',
			        'sub_nav_index',
			        'children'
			      ]

			itemsData = itemsData.map(function(items) {

		        let Oitems = {}
		        let options = items.group1 !== undefined && (items.group2 || items.group3)
		        let [
		            text,
		            type,
		            menu_index,
		            sub_nav_index,
		            children] = [items.group1,options ? 'menu_select' : 'menu_list',0,'',options ? [{sub_text: items.group2,sub_children: items.area1}] : items.area1]

		        let aa = [
		            text,
		            type,
		            menu_index,
		            sub_nav_index,
		            children]

		          OitemsField.forEach(function(item,index) {
		              Oitems[item] = aa[index]
		          })
		          return Oitems

      		})
			return itemsData
		}
	},
	methods: {
		onGetOptions(data) {
			this.search_options = data
	    },
		initData(map) {
			this.map = map
		},
		get_site_data_lat(bssw,bsne) {

			this.loading = true
			if (this.resultLatLng !== '') {
				this.filterData(this.resultLatLng,bssw,bsne)
			} else {
				this.FetchData(bssw,bsne)

    		}
		},
		FetchData(bssw,bsne,url = 'http://192.168.1.161:3000/get_site_now_lat') {
			let that = this

			let opitions = {
		            method: 'POST',
		            body: {
					status: 0
		            }
		        }

			Fetch(url, opitions)
		      	.then((data) => {
			        if (data !== null) {

				        that.resultLatLng = data
						that.filterData(data,bssw,bsne)
					}
	    		})
		},
		filterData(data,bssw,bsne) {
			// 进行lat的过滤
			let that = this
			let resultLatLng = data

			resultLatLng = resultLatLng.filter(function(item) {
				return item.lat >= bssw.lat && item.lat <= bsne.lat
			})
			// 进行lng的排序
			resultLatLng = resultLatLng.sort(function(a,b) {
				return a.lng - b.lng
			})
			// 进行lng的过滤
			resultLatLng = resultLatLng.filter(function(item) {
				return item.lng >= bssw.lng && item.lng <= bsne.lng
			})
			// 进行面积的过滤
			let filterArea = that.filter_options['area'] || {}

			filterArea.length >= 2 && 	(resultLatLng = resultLatLng.filter(function(item) {
				return item.area >= filterArea[0] && item.area <= filterArea[1]
			}))

			this.map.clearOverlays()		// 清除覆盖物
			that.loading = false
			resultLatLng.forEach(function(item) {
				that.addMarker(item)
			})
			clearTimeout(this.timer)
		},
		regxArea(key) {
			let reg = /㎡$/

			this.filter_options.area = this.search_options[key].text.replace(reg,'').split('-')
			let bssw = this.bs.getSouthWest() // 可视区域左下角
			let bsne = this.bs.getNorthEast() // 可视区域右上角

			this.get_site_data_lat(bssw,bsne)
		},
		addMarker(pointData) {
			var point = new BaiduMap.Point(pointData.lng, pointData.lat)
			let ComplexCustomOverlay = this.mapaddOverlay()
			var txt = pointData.address + pointData.area + '㎡'


		    var myCompOverlay = new ComplexCustomOverlay(point, txt)

		    this.map.addOverlay(myCompOverlay)
		},
		getLocation() {
			let geoLocation = new BaiduMap.Geolocation()
			let that = this
			let promise = new Promise(function(resolve,rejected) {
				geoLocation.getCurrentPosition(function(r) {
					resolve(r)
				},{enableHighAccuracy: true})
			})

			promise.then(function(data) {
				that.initPoint = data.point
				that.flag = that.initPoint !== undefined
			})

		},
		moveOrZoom() {
			this.bs = this.map.getBounds()
		},
		mapaddOverlay() {
			let that = this

			function ComplexCustomOverlay(point, text, mouseoverText) {
		      this._point = point
		      this._text = text
		      this._overText = mouseoverText
		    }
		    ComplexCustomOverlay.prototype = new BaiduMap.Overlay()
		    ComplexCustomOverlay.prototype.initialize = function(map) {
		      this._map = map
		      this._div = document.createElement('div')
		      this._span = document.createElement('span')
		      this._arrow = document.createElement('div')
		      let arrow = this._arrow
		      let div = this._div
		      let span = this._span

		      div.style.position = 'absolute'
		      div.style.zIndex = BaiduMap.Overlay.getZIndex(this._point.lat)
		      div.style.backgroundColor = '#EE5D5B'
		      div.style.border = '1px solid #BC3B3A'
		      div.style.color = 'white'

		      div.style.padding = '4px'
		      div.style.whiteSpace = 'nowrap'
		      div.style.MozUserSelect = 'none'
		      div.style.fontSize = '0.2rem'
		      div.style.borderRadius = '4px'


		      div.appendChild(span)
		      span.appendChild(document.createTextNode(this._text))
		      span.style.color = 'white'
		      span.style.lineHeight = '10px'
		      span.style.margin = '8px'

		      arrow.className = 'arrow'

		      arrow.style.position = 'absolute'
		      arrow.style.width = '6px'
		      arrow.style.height = '6px'
		      arrow.style.right = '0px'
		      arrow.style.left = '0px'
		      arrow.style.bottom = '-4px'
		      arrow.style.overflow = 'hidden'
		      arrow.style.transform = 'rotate(45deg)'
		      arrow.style.border = '1px solid  #EE5D5B'
		      arrow.style.borderTop = 'none!important'
		      arrow.style.borderLeft = 'none!important'
		      arrow.style.backgroundColor = '#EE5D5B'
		      arrow.style.margin = 'auto'
		      div.appendChild(arrow)


		      that.map.getPanes().labelPane.appendChild(div)

		      return div
		    }
		    ComplexCustomOverlay.prototype.draw = function() {
			    var map = this._map
			    var pixel = map.pointToOverlayPixel(this._point)

			    this._div.style.left = (pixel.x - parseInt(this._arrow.style.left,0)) + 'px'
	      		this._div.style.top = (pixel.y - 35) + 'px'
		    }

		    return ComplexCustomOverlay
		}
	}
}
</script>