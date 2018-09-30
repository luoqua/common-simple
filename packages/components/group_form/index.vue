<template>
	<div :class="b()">
		<label :class="b('label')">{{labelName}}</label>
		<div :class="b('modform')">
			<div :class="b('modflex')">
				<slot></slot>
			</div>
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


<style type="text/css" lang="scss" scoped>
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
		}
		&__modform{
			display: table-cell;
		    vertical-align: top;
		    float: none;
		    width: auto;
		    #{$p}__modflex{
				display: inline-flex;
				align-items: center;
				width: initial;
		    }
		}
	}
</style>