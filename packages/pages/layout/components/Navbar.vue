<template>
<div :class="b()">
	<div :class="b('left')">
		<a href="http://www.youzanyun.com/zanui" :class="b('logo')">
			<img src="http://m.wxjysgcd.com/Upload/logo.png"> 
			<span>
				Spl
			</span>
		</a>

	</div>
	<div :class="b('right')">
		
   		<bread-crumb></bread-crumb>
      	<el-dropdown>
      		<div class="avatar-wrapper">
			  	<img class="user-avatar" :src="header">
		        <i class="el-icon-caret-bottom"></i>
	        </div>
		    <el-dropdown-menu slot="dropdown">
			    <el-dropdown-item>Github</el-dropdown-item>
			    <el-dropdown-item>首页</el-dropdown-item>
			    <el-dropdown-item>退出登录</el-dropdown-item>
		    </el-dropdown-menu>
		</el-dropdown>
	   
	</div>
</div>

</template>


<script type="text/javascript">

import create from '@/utils/create'

import BreadCrumb from '@/components/breadcrumb'

export default create({
	name: 'nav-bar',
	props: [],
	data() {
		return {
			header: 'packages/utils/header.png'
		}
	},
	components: {
		BreadCrumb
	},
	methods: {

	}
})
</script>


<style type="text/css" lang="scss"   >
	.simple-nav-bar{
		@include fj(space-between,center);
		background-color: #fff;
	    padding: 0 40px;
	    height: 60px;
	    line-height: 60px;

	}

	.simple-nav-bar__logo{
			display: block;
			line-height: 60px;
			span,img{
				display: inline-block;
				vertical-align: middle;
			}
			img {
			    width: 24px;
			    margin-right: 5px;
			}
			span{
				color: #333;
			    font-size: 20px;
			    font-family: Dosis,Source Sans Pro,Helvetica Neue,Arial,sans-serif;
			}
	}
	.simple-nav-bar__right{
		-webkit-box-flex: 1;
	    -ms-flex: 1;
	    flex: 1;
	    text-align: right;
	    ul{
	    	li{
	    		float: right;
	    	}
	    }
	}
	.avatar-wrapper{
		cursor: pointer;
	    position: relative;
	    text-align: center;
	    img{
	    	border-radius: 10px;
		    height: 40px;
		    width: 40px;
		    vertical-align: middle;
	    }
	    i{
	    	vertical-align: middle;
	    	margin-top: 25px;
	    }

	}
</style>
