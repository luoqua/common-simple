<template>
  <section class="nav-section">
  	<ul>
  		<li class="nav active" :class="classObject" >
  			<span class="current-condition">
  				户型
  			</span>
  			<i class="icon-arrow"></i>
  		</li>
  		<li class="nav">
  			<span class="current-condition">
  				风格
  			</span>
  			<i class="icon-arrow"></i>
  		</li>
  		<li class="nav">
  			<span class="current-condition">
  				面积
  			</span>
  			<i class="icon-arrow"></i>
  		</li>
  		<li class="nav">
  			<span class="current-condition">
  				更多
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
			nav_info:[
				{

				},
			]
		}
	},
	computed: {
		classObject(){
			return this.nav_index
		}
	}
	methods: {
		changeActive(index) {
			this.nav_index = index	
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
