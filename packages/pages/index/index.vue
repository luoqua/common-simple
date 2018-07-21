<template>
  <section class="nav-section">
  	<ul>
  		<li class="nav" v-for="(item,index) in nav_info" :class="{ active : nav_index === index}" @click="changeActive(index)" >
  			<span class="current-condition">
  				{{ item }}
  			</span>
  			<i class="icon-arrow"></i>
  		</li>
  	</ul>
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
			nav_info: [
				'户型',
				'风格',
				'面积',
				'更多'
			]
		}
	},
	computed: {
	},
	methods: {
		changeActive(index) {
			this.nav_index = this.nav_index === index ? 5 : index
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../styles/common';
.nav-section{
	@include wh(100%,auto)
	ul{
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
				@include center;
				@include ts-style(0.3s)
				margin-left: px2rem(45);
			}
		}
		.active{
			.icon-arrow{
				@include trans-rotate(-180deg)
			}
		}
	}
}

</style>
