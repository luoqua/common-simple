<template>
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
						@click="changeSubNav(index)" >
						{{item}}
					</li>
				</ul>
			</section>
		</section>
		<section class="menu3 menu_list" v-if="menu_list">
			<ul >
	            <li :class="{ active : items[nav_index].menu_index === index}"
	            	v-for="(item,index) in area_menu"
	            	@click="changeNav(index)" >
	           	    <a>{{item}}</a>
	            </li>
            </ul>
		</section>
	</section>
  </section>
</template>

<script>
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
								'梁溪区'
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
			]
		}
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
		},
		changeNav(index) {
			this.items[this.nav_index].menu_index = index
		},
		changeSubNav(index) {
			this.items[this.nav_index].sub_nav_index = index
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../styles/common';
.nav-section{
	@include wh(100%,auto)
	ul.nav-ul{
		@include fj(flex-start);	
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
				@include bgicon('../../icons/icon-arrow.png',15,10)
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
}

</style>
