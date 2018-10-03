<template>
		<button type="button" :class="b({default:buttonType})" :style="bgColor">
			<div class="webuploader-pick" style="width: 106px; height: 36px;">
				<span class="Button_new__content-3NEGo">上传图片</span>
			</div>
			<!-- <div id="rt_rt_1coo1gb76b971gon138vblj1iro1" style="position: absolute; top: 0px; left: 0px; width: 106px; height: 36px; overflow: hidden; bottom: auto; right: auto;">
				<input type="file" name="file" class="webuploader-element-invisible" accept="image/jpg,image/jpeg,image/png,image/bmp">
				<label style="opacity: 0; width: 100%; height: 100%; display: block; cursor: pointer; background: rgb(255, 255, 255);">
					
				</label>
			</div> -->
		</button>
</template>



<script type="text/javascript">
import create from '@/utils/create'

export default create({
	name: 'button',
	props: {
		backgroundColor: {
			default: null
		}
	},
	data() {
		return {
		}
	},
	computed: {
		bgColor() {
			if (this.backgroundColor !== null) {

				return {
					backgroundColor: this.backgroundColor,
					borderColor: this.backgroundColor

				}
			}
		},
		buttonType() {
			return	this.backgroundColor === null
		}
	},
	methods: {

	}
})
</script>


<style type="text/css" lang="scss">
	.simple-button{
		display: inline-block;
	    position: relative;
	    box-sizing: border-box;
	    padding: 0 24px;
	    height: 36px;
	    font-size: 14px;
	    line-height: 34px;
	    text-align: center;
	    text-decoration: none;
	    border: none;
	    border-radius: 3px;
	    outline: none;
	    overflow: visible;
	    cursor: pointer;
	    -webkit-user-select: none;
	    -ms-user-select: none;
	    user-select: none;
	    transition: padding .2s ease;
		width: 106px; 
		transition: none; 
		padding: 0px;
	    color: #24262e;
	    
    	$p:&;
    	&--default{
    		background-color: #fafbfc;
    		box-shadow: inset 0 0 0 1px #d3d4d6;
    		border:none;
    	}
    	&:active{
			&::before{
				opacity: 0.3;
			}
    	}
    	&:before{
    		content: "";
    		@include center;
    		@include wh(100%,100%);
    		background-color: #000;
    		opacity: 0;
    	}
	}
</style>