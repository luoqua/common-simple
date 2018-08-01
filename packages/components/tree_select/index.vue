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
								@click="changeSubNav(index,item)" >
								{{item.text}}
							</li>
						</ul>
					</section>
				</section>
				<section class="menu3 menu_list" v-if="menu_list">
					<ul >
			            <li :class="{ active : items[nav_index].menu_index === index}"
			            	v-for="(item,index) in area_menu"
			            	@click="changeNav(index,item)" >
			           	    <a>{{item.text}}</a>
			            </li>
		            </ul>
				</section>
			</section>
			<section class="box_mask" v-if="box_mask" @click="change_mask()"></section>
	  </section>
</template>


<script>
export default {
	name: 'tree-select',
	props: {
		items: {
			type: Array,
			default: () => []
		}
	},
	data() {
		return {
			box_mask: false,
			nav_index: 5
		}
	},
	created() {
		console.log(this.items)
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
		change_mask() {
			this.box_mask = !this.box_mask
			this.nav_index = 5
		},
		emitSearchOptions() {
			this.$emit('itemclick', { ...this.search_options })
		}
	},
	watch: {
		search_options() {
			this.$emit('itemclick', { ...this.search_options })
		}
	}

}
</script>

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
</style>