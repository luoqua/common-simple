<template>
	<div :class="b()">
		<label :class="b('label')">{{labelName}}</label>
		<div :class="b('modform')">
			<slot></slot>
		</div>
	</div>
</template>



<script type="text/javascript">
import create from '@/utils/create'

export default create({
	name: 'groupform',
	props: {
		labelName: {
			type: String
		}
	},
	data() {
		return {
		}
	},
	methods: {

	}
})
</script>


<style type="text/css" lang="scss"    >
	.simple-groupform{
		margin-bottom: 28px;
		$p:&;
		&__label{
		    float: left;
		    width: 6em;
		    margin-top: .3em;
		    margin-right: 28px;
		    font-size: 14px;
			margin-left: 16px;
			margin-top: 0.3em;
			margin-top: 0px;
    		width: 4em;
		}
		&__modform{
			display: table-cell;
		    vertical-align: top;
		    float: none;
		    width: auto;
		    
		}
	}
</style>