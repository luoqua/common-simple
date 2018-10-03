<template>
	<div :class="b()">
		<slot />
	</div>
</template>



<script type="text/javascript">
import create from '@/utils/create'

export default create({
	name: 'radio-group',
	props: [],
	data() {
		return {
			value: null
		}
	},
	methods: {

	},
	watch: {
		value() {
			this.$emit('change',this.value)
		}
	}
})
</script>


<style type="text/css" lang="scss" >
	.simple-radio-group{
		line-height: 16px;
	}
</style>