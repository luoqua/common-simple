<template>
	<widget-basic
		title="标题">
		<text-title></text-title>
	</widget-basic>
</template>



<script type="text/javascript">
import create from '@/utils/create'
import textTitle from '../index.vue'
import widgetBasic from '@/components/widget_basic'


export default create({
	name: 'text-title-demo',
	props: [],
	data() {
		return {
		}
	},
	components: {
		widgetBasic,
		textTitle
	},
	methods: {

	}
})
</script>


<style type="text/css" lang="scss">

</style>