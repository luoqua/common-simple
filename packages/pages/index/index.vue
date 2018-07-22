<template>
  <section class="nav-section">
  	<ul class="nav-ul">
  		<li class="nav" v-for="(item,index) in nav_info" :class="{ active : nav_index === index}" @click="changeActive(index)" >
  			<span class="current-condition">
  				{{ item }}
  			</span>
  			<i class="icon-arrow"></i>
  		</li>
  	</ul>
  	<section class="menu">
		<section class="menu1">
			<ul>
				<li
				 v-for="(area_item,index) in area_menu" 
				 @click="changeNav(index)"
				 :class="{ active : menu_index === index}"
				 >{{area_item.name}}</li>
			</ul>
		</section>
		<section class="menu2" >
			<ul class="sub_menu" >
				<li class="menu2_li" 
					v-for="(subarea_item,index) in area_menu[menu_index].submenu"
					:class="{ active : sub_nav_index === index}"
					@click="changeSubNav(index)" >
					{{subarea_item}}
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
			msg: 'Welcome to Your Vue.js Appaaaa',
			isActive: false,
			nav_index: 5,
			menu_index: 0,
			sub_nav_index: '',
			nav_info: [
				'区域',
				'面积',
				'类型',
				'更多'
			],
			area_menu: [
				{
					name: '按区域',
					submenu: [
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
				},
				{
					name: '按地铁',
					submenu: [
						'11',
						'12',
						'滨22湖区',
						'新吴区',
						'惠山区',
						'锡山区',
						'宜兴市',
						'江阴市',
						'梁溪区'
					]
				}
			]
		}
	},
	computed: {
	},
	methods: {
		changeActive(index) {
			this.nav_index = this.nav_index === index ? 5 : index
		},
		changeNav(index) {
			this.menu_index = index
		},
		changeSubNav(index) {
			this.sub_nav_index = index
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
}

</style>
