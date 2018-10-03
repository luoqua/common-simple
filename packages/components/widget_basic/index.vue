<template>
<div :class="b()">
	<div :class="b('head')" >
		<span :class="b('title')">页面顶部</span>
	 	<div :class="b('right')">
	 		<a href="javascript:void(0);">展开</a>
	 	</div>
	</div>
	<div :class="b('body')">
		<div :class="b('padding')">
			<slot></slot>
		</div>
	</div>
</div>
</template>



<script type="text/javascript">
import create from '@/utils/create'

export default create({
	name: 'widget-basic',
	props: [],
	data() {
		return {
		}
	},
	methods: {

	}
})
</script>


<style type="text/css" lang="scss"    >
	.simple-widget-basic{
		margin-bottom: 8px;
	    border-radius: 2px;
	    position: relative;
	    $p:&;
	    &__head{
	    	background: #fafbfc;
		    border: 1px solid #e3e4e6;
		    padding: 14px 15px;
		    font-size: 14px;
		    line-height: 16px;
		    &:hover{
		    	background: #f4f5f7;
    			border-color: #d3d4d6;
		    }
		    #{$p}__title{
	    		color: #8f9196;
	    	}
	    	#{$p}__right{
	    		float: right;
	    	}
	    }
	    &__body{
	    	max-height: 1500px;
		    transition-duration: .3s;
		    transition-timing-function: ease-in;
		    #{$p}__padding{
		    	color: #111;
			    border: 1px solid #e3e4e6;
			    border-top: none;
			    padding: 40px 0 48px 40px;
		    }
	    }

	}
</style>