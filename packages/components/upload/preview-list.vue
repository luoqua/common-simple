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
	font-size: 0;
	margin-top: 15px;
	$p:&;
	&__imgWrap{
		background-size: cover;
		background-position: 50%;
		width: 100px;
	    height: 100px;
	    margin-right: 10px;
	    position: relative;
	    display: inline-block;
	    #{$p}__operator{
	    	position: absolute;
		    height: 22px;
		    bottom: 0;
		    left: 0;
		    background-color: rgba(0,0,0,.5);
		    z-index: 1;
		    width: 100%;
		    text-align: center;
		    cursor: pointer;
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