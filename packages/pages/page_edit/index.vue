<template>
	<div :class="b()">
		<div :class="b('content')">
			<div :class="b('cardWrapper')">
				<div :class="b('cardTitle')">
					<div :class="b('cardtitle')">页面编辑</div>
					<div :class="b('cardSubtitle')">编辑你的原生推广页</div>
				</div>
				<div :class="b('cardContent')">
					<div :class="b('formGroup')">
						
					</div>
					<div :class="b('formGroup')">
						
					</div>
				</div>
				
			</div>
		</div>
		<div :class="b('preview')">
			<div :class="b('cardWrapper')">
				
			</div>
		</div>
	</div>
</template>



<script type="text/javascript">
import create from '@/utils/create'

export default create({
	name: 'page-edit',
	props: [],
	data() {
		return {
		}
	},
	methods: {

	}
})
</script>


<style type="text/css" lang="scss" scoped>
	.simple-page-edit{
		@include wh(1200px,auto);
		height: 500px;
		@include fj;
		margin: 0 auto;
		$p: &;
		&__cardWrapper{
			position: relative;
		    margin-bottom: 8px;
		    padding: 16px 24px 42px;
		    color: #24262e;
		    background-color: #fff;
		    box-shadow: 0 0 1px 0 rgba(0,0,0,.04), 0 1px 2px 0 rgba(37,39,46,.08), 0 1px 2px 0 rgba(37,39,46,.12), 0 0 0 1px #ebedf0;
		    border-radius: 2px;
		    #{$p}__cardTitle{
		    	margin-bottom: 24px;
		    	#{$p}__cardtitle{
					margin-bottom: 4px;
				    font-size: 14px;
				    line-height: 22px;
		    	}
		    	#{$p}__cardSubtitle{
					    font-size: 13px;
					    line-height: 20px;
					    color: #8f9196;
		    	}
		    	#{$p}__formGroup{
		    		margin-bottom: 28px;
		    	}
		    }
		}
   		&__content{
			flex: none;
			@include wh(796px,100px);
   		}
   		&__preview{
			@include wh(392px,100px)
   		}
	}
</style>