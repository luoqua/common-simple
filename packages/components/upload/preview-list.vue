<template>
	<transition-group
		tag="div"
		:class="b('')"
		name="preview-list">
		 	<span :class="b('imgWrap')" v-for="(item,index) in imgWrap" 
		 	:style="toStyleBg(item)"
		 	:key='item'>
		 		<a :class="b('operator')" @click="del(index)">
		 			<i class="iconfont icon-shanchu"></i>
		 		</a>
		 	</span>
	</transition-group>
</template>



<script type="text/javascript">
import create from '@/utils/create'

export default create({
	name: 'preview-list',
	props: {
		imgWrap: Array
	},
	data() {
		return {
		}
	},
	components: {

	},
	methods: {
		toStyleBg(img) {
			return {
				backgroundImage: `url(${img})`
			}
		},
		del(index) {
			this.$emit('delFile',index)
		}
	}
})
</script>


<style type="text/css" lang="scss">
.simple-preview-list{
	vertical-align: top;
	margin-top: 15px;
	$p:&;
	&__imgWrap{
		background-size: cover;
		background-position: 50%;
		width: 100px;
	    height: 100px;
	    margin-right: 10px;
	    display: inline-block;
	    line-height: 100px;
	    transition:all 1s;
	    #{$p}__operator{
		    background-color: rgba(0,0,0,.5);
		    z-index: 1;
		    width: 100%;
		    text-align: center;
		    cursor: pointer;
		    line-height: 22px;
		    display: inline-block;
		    vertical-align: bottom;
		    position: relative;
	    	&:hover{
	    		text-decoration: none;
	    		.icon-shanchu{
	    			color: #c6c4c4;
	    		}
	    	}
		    .icon-shanchu{
		    	color: #b2b2b2;
		    }
	    }
	}
}

</style>