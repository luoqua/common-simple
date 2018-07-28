<template>
	<section>
	  <section class="nav-section">
	  	<ul class="nav-ul">
	  		<li class="nav" v-for="(item,index) in items" :class="{ active : nav_index === index}" @click="changeActive(index)" >
	  			<span class="current-condition">
	  				{{ item.text }}
	  			</span>
	  			<i class="icon-arrow"></i>
	  		</li>
	  	</ul>
	  	<section class="menu">
	  		<section class="menu_select" v-if="menu_select">
					<section class="menu1" :style="{ width: mainWidth }">
						<ul>
							<li
							 v-for="(item,index) in area_menu"
							 @click="changeNav(index)"
							 :class="{ active : items[nav_index].menu_index === index}"
							 >{{item.sub_text}}</li>
						</ul>
					</section>
					<section class="menu2" v-if="Ishave">
						<ul class="sub_menu" >
							<li class="menu2_li"
								v-for="(item,index) in area_submenu"
								:class="{ active : items[nav_index].sub_nav_index === index}"
								@click="changeSubNav(index,item)" >
								{{item}}
							</li>
						</ul>
					</section>
				</section>
				<section class="menu3 menu_list" v-if="menu_list">
					<ul >
			            <li :class="{ active : items[nav_index].menu_index === index}"
			            	v-for="(item,index) in area_menu"
			            	@click="changeNav(index,item)" >
			           	    <a>{{item}}</a>
			            </li>
		            </ul>
				</section>
			</section>
			<section class="box_mask" v-if="box_mask" @click="change_mask()"></section>
	  </section>
  	<section id="allmap" :style="{ height: mapHeight + 'px' }"></section>
  </section>
</template>

<script>
import BaiduMap from 'BaiduMap'
import { Fetch } from '../../utils/common.js'

export default {
	name: 'Index',
	data() {
		return {
			nav_index: 5,
			items: [
				{
					text: '区域',
					type: 'menu_select',
					menu_index: 0,
					sub_nav_index: '',
					children: [
						{
							sub_text: '按区域',
							sub_children: [
								'全部',
								'附近',
								'滨湖区',
								'新吴区',
								'惠山区',
								'锡山区',
								'宜兴市',
								'江阴市',
								'梁溪区',
								'常州市'
							]
						}
					]
				},
				{
					text: '面积',
					type: 'menu_list',
					menu_index: 0,
					sub_nav_index: '',
					children: [
						'80-90㎡',
						'90-100㎡',
						'100-110㎡',
						'110-120㎡',
						'120-130㎡',
						'130-140㎡',
						'140-180㎡'
					]
				},
				{
					text: '类型',
					type: 'menu_list',
					menu_index: 0,
					sub_nav_index: '',
					children: [
						'在建工地',
						'完工工地'
					]
				},
				{
					text: '更多',
					children: []
				}
			],
			mapHeight: '',
			box_mask: false,
			search_options: {},	// 所选条件
			map: '',	// map实例化对象
			bs: '',		// 可视区域
			resultLatLng: '',
			filter_options: {}		// 过滤条件
		}
	},
	created() {
	},
	mounted() {
		this.initMap()								// 初始化地图
		this.resizeMapHeight()						// 初始化设置地图高度
		this.initMapData()
		this.map.addEventListener('zoomend',this.move_or_zoom)	// 绑定缩放事件
		this.map.addEventListener('dragend',this.move_or_zoom)	// 绑定拖拽事件
	},
	computed: {
		area_menu() {
			const selectArea = this.items[this.nav_index] || {}

			return selectArea.children || {}
		},
		area_submenu() {

			const selectSubArea = this.area_menu[this.items[this.nav_index].menu_index] || {}

			return selectSubArea.sub_children || {}
		},
		mainWidth() {
			let selectAreaTem = this.area_menu || {}

			if (selectAreaTem.length > 0) {
				selectAreaTem = selectAreaTem.filter(function(item) {
					return item.sub_children.length !== 0
				})
			}

			if (selectAreaTem.length === 0) {
				return '100%'
			}

			return '40%'
		},
		Ishave() {
			if (this.mainWidth === '100%') {
				return false
			}

			return true
		},
		menu_select() {
			let selectArea = this.items[this.nav_index] || {}
			let menuType = selectArea.type

			return menuType === 'menu_select'

		},
		menu_list() {
			let selectArea = this.items[this.nav_index] || {}
			let menuType = selectArea.type

			return menuType === 'menu_list'
		}

	},
	methods: {
		changeActive(index) {
			this.nav_index = this.nav_index === index ? 5 : index
			this.box_mask = true
		},
		changeNav(index,value) {
			this.items[this.nav_index].menu_index = index
			if (value !== undefined) {
				let text = this.items[this.nav_index].text

				this.search_options = Object.assign({},this.search_options,{[text]: value})
				// this.search_options[text] = value vue 无法监听属性变化
				this.change_mask()
			}
		},
		changeSubNav(index,value) {
			this.items[this.nav_index].sub_nav_index = index
			let searchSubText = this.items[this.nav_index].text

			this.search_options = Object.assign({},this.search_options,{[searchSubText]: value})
			this.change_mask()
		},
		resizeMapHeight() {
			var resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize'
			var that = this
			let oallmap = document.getElementById('allmap')

			that.mapHeight = document.documentElement.clientHeight - oallmap.offsetTop

			window.addEventListener(resizeEvent, function() {

				that.mapHeight = document.documentElement.clientHeight - oallmap.offsetTop

			}, false)
		},
		initMap() {
			this.map = new BaiduMap.Map('allmap')						// 创建地图实例
			let point = new BaiduMap.Point(120.343373,31.540212)		// 创建中心点坐标
			let marker = new BaiduMap.Marker(point) // 创建标注

			this.map.centerAndZoom(point,16)							// 初始化地图，设置中心点坐标和地图级别

			this.map.addOverlay(marker)
		},
		change_mask() {
			this.box_mask = !this.box_mask
			this.nav_index = 5
		},
		initMapData() {
			this.bs = this.map.getBounds() // 获取可视区域

			let bssw = this.bs.getSouthWest() // 可视区域左下角
			let bsne = this.bs.getNorthEast() // 可视区域右上角

			this.get_site_data_lat(bssw,bsne)

		},
		addMarker(pointData) {
			var point = new BaiduMap.Point(pointData.lng, pointData.lat)
			var marker = new BaiduMap.Marker(point)

			this.map.addOverlay(marker)
		},
		move_or_zoom() {
			this.bs = this.map.getBounds()
		},
		get_site_data_lat(bssw,bsne) {
			let that = this

			if (that.resultLatLng !== '') {
				that.filterData(that.resultLatLng,bssw,bsne)
			} else {

				let opitions = {
		            method: 'POST',
		            body: {
						status: 0
		            }
		        }

				Fetch('http://192.168.1.144:3000/get_site_data_lat', opitions)
		      	.then((data) => {
			        if (data !== null) {

				        	that.resultLatLng = data
							that.filterData(data,bssw,bsne)
						}
	    		})
    		}
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

			let filterArea = that.filter_options['area'] || {}

			
			if (filterArea.length >= 2) {
				
				resultLatLng = resultLatLng.filter(function(item) {
					return item.area >= filterArea['area'][0] && item.area <= filterArea['area'][1]
				})

			}

			console.log(resultLatLng)
			resultLatLng.forEach(function(item) {
				that.addMarker(item)
			})

		}
	},
	watch: {
		search_options() {
			let that = this

			Object.keys(this.search_options).forEach(function(key) {
				if (key === '面积') {
					let reg = /㎡$/

					that.filter_options.area = that.search_options[key].replace(reg,'').split('-')
					that.bs = that.map.getBounds()
				} else if (key === '区域') {

					let myGeo = new BaiduMap.Geocoder()

					if (that.search_options[key] === '全部') {
						that.search_options[key] = '无锡市'
					}
					myGeo.getPoint(that.search_options[key], function(pointAddress) {

						let point = new BaiduMap.Point(pointAddress.lng,pointAddress.lat)		// 创建中心点坐标
						let marker = new BaiduMap.Marker(point) // 创建标注


						that.map.centerAndZoom(point,13)							// 初始化地图，设置中心点坐标和地图级别

						that.map.addOverlay(marker)

						that.bs = that.map.getBounds()

					}, '无锡市')
				}
			})

		},
		bs() {
			let bssw = this.bs.getSouthWest() // 可视区域左下角
			let bsne = this.bs.getNorthEast() // 可视区域右上角

			this.get_site_data_lat(bssw,bsne)
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../styles/common';
.nav-section{
	@include wh(100%,auto);
	z-index: 999;
	ul.nav-ul{
		@include fj(flex-start);
		position: relative;
		z-index: 3;
		.nav{
			@include wh(25%,px2rem(82));
		    line-height: px2rem(80);
			background: #fff;
			color: #333;
			position: relative;
			@include bs(false,true,false,true,px2rem(1) solid #ddd);
			@include sc(28);
			text-align: center;
			.current-condition{
				margin-left:px2rem(-20)
			}
			.icon-arrow{
				@include bgicon('../../icons/icon-arrow.png',16,10)
				position: relative;
				@include ts-style(0.3s)
				margin-left: px2rem(15);
				margin-bottom: px2rem(5);
			}
		}
		li.active{
			.icon-arrow{
				@include trans-rotate(-180deg)
			}

			&:after{
				content: '';
				@include wh(px2rem(20),px2rem(20))
				@include bs(true,false,false,true,px2rem(1) solid #ddd);
				@include trans-rotate(-45deg)
				@include pos-ab-bl(- px2rem(12),50%);
				background-color: #fff;
				margin-left: - px2rem(10)
			}
		}
	}
	.menu{
		position: absolute;
		width: 100%;
		@include pos-ab-tr(px2rem(82),0);
		@include sc(28);
		@include fj(flex-start);
		.menu_select{
			position: absolute;
			width: 100%;
			@include sc(28);
			@include fj(flex-start);
			z-index: 999;
			background: #fff;
		    .menu1{
				@include wh(40%)
				li{
					@include bs(false,true,false,false,px2rem(1) solid #ddd);
					padding: 0 px2rem(30);
					height: px2rem(80);
	    			line-height: px2rem(80);
				}
				.active{
					color: #62ab00;
				}
			}
			.menu2{
				@include wh(60%);
				max-height: px2rem(400);
				overflow-y:scroll;
				li{
					@include bs(false,true,true,true,px2rem(1) solid #ddd);
					padding: 0 px2rem(30);
					height: px2rem(80);
	    			line-height: px2rem(80);
				}
				.active{
					color: #62ab00;
				}
				&::-webkit-scrollbar {/*滚动条整体样式*/
				        width: px2rem(5);     /*高宽分别对应横竖滚动条的尺寸*/
				        height: 1px;
				    }
				&::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
				        border-radius: px2rem(10);
				         -webkit-box-shadow: inset 0 0 px2rem(5) rgba(0,0,0,0.2);
				        background: #535353;
				    }
				&::-webkit-scrollbar-track {/*滚动条里面轨道*/
				        -webkit-box-shadow: inset 0 0 px2rem(5) rgba(0,0,0,0.2);
				        border-radius: px2rem(10);
				        background: #EDEDED;
				    }
			}
		}
		.menu3{
			@extend .menu2;
			@include wh(100%);
			z-index: 999;
			background: #fff;
			ul{
				@include fj(flex-start);
				padding-bottom: px2rem(30);
				li{
					width: 30%;
					margin: px2rem(30) 0 0 1.90625%;
					border:none;
					padding: 0 px2rem(20);
					a{
						border: 1px solid #ececec;
					    height:  px2rem(68);
					    line-height: px2rem(68);
					    color: #333;
					    text-overflow: ellipsis;
					    white-space: nowrap;
					    display: block;
					    font-size: px2rem(28);
					    text-align: center;
					}
				}
				.active{
					a{
						background-color: #ececec;
					}
				}
			}
		}
	}

	.box_mask{
		@include allcover;
		@include wh(100%,100%);
		background-color: rgba(0,0,0,.5);
		z-index: 2;
	}
}
#allmap{
	width: 100%;
	height: px2rem(1000);
}

</style>
