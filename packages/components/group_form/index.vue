<template>
	<div :class="b()">
		<label :class="b('label')" :style="isMargintop">{{labelName}}</label>
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
		},
		isTop: {
			type: Boolean,
			default: true
		}
	},
	computed: {
		isMargintop() {
			return {
				marginTop: this.isTop ? '0.5em' : '0px',
				width: this.isTop ? '4em' : '6em'
			}
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