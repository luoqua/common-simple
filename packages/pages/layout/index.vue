<template>
	<section class="side-bar">
		<el-menu
	      default-active="1"
	      class="el-menu-vertical-demo"
	      @open="handleOpen"
	      @close="handleClose"
	      background-color="#31b0ad"
	      text-color="#fff"
	      active-text-color="#8ffaf8">
	      <el-submenu index="1" >

	        <template slot="title">

			<i class="iconfont icon-zujian icon-title"></i>
	          <span :class="a">组件</span>
	        </template>
	        <router-link :to="item.path" v-for="(item,index) in nav_list.children" :key="index">
				<el-menu-item :index="item.name||item.path" :key="item.name">
					<span slot="title">{{item.meta.name}}</span>
				</el-menu-item>
			</router-link>

	      </el-submenu>

	    </el-menu>

	</section>
</template>

<script>
import {store} from '@/store/store'

export default{
	data() {
		return {
			activeIndex: '1',
			activeIndex2: '1',
			isCollapse: false,
			a: ['ad','cd'],
			nav_list: ''
		}
	},
	created() {
		this.nav_list = store.state.permissionList.find(route => route.path === '')
	},
	methods: {
		handleSelect(key,keyPath) {
			console.log(key,keyPath)
		},
		handleOpen(key, keyPath) {
        	console.log(key, keyPath)
      	},
      	handleClose(key, keyPath) {
        	console.log(key, keyPath)
      	},
		toggle() {
			this.isCollapse = !this.isCollapse
		}
	}
}
</script>

<style lang="scss"   >
	.side-bar{
	    -webkit-transition: width .28s;
	    bottom: 0;
	    font-size: 0;
	    height: 100%;
	    left: 0;
	    overflow: hidden;
	    position: fixed;
	    top:60px;
	    transition: width .28s;
	    width: 180px!important;
	    z-index: 1001;
	    .el-menu-item{
	    	background: #05817f!important;
	    	&:hover{
	    		background-color: #014a49!important;
	    	}
	    }
	}
	.el-menu-vertical-demo:not(.el-menu--collapse) {
	    width: 180px;
	    min-height: 400px;
	}
	.el-submenu [class^=iconfont] {
	    vertical-align: middle;
	    margin-right: 5px;
	    width: 24px;
	    text-align: center;
	    font-size: 18px;
	}
	.el-submenu .el-menu-item{
		min-width: auto;
	}
	.el-submenu__title i{
		color: #fff;
	}

</style>