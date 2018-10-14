<template>
	<div :class="b('')" >
	 	<div :class="b('imgWrap')" v-for="(item,index) in imgWrap" :style="toStyleBg(item)">
	 		<a class="UploadPreview__imgOpr-1ENua">
	 			<i class="icon__base-2qdgw icon__bin-Xt0w-" data-role="icon" style="vertical-align: 6px;">

	 			</i>
	 		</a>
	 	</div>
	</div>
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
	}
}

</style>