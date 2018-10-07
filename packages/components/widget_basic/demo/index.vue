<template>
	<widget-basic>
		<Radio />
		<Upload />
	</widget-basic>
</template>



<script type="text/javascript">
import create from '@/utils/create'
import Radio from '@/components/radio/demo'
import Upload from '@/components/upload/demo'
import widgetBasic from '../index.vue'

export default create({
	name: 'widget-basic-demo',
	props: [],
	data() {
		return {
		}
	},
	components: {
		widgetBasic,
		Radio,
		Upload
	},
	methods: {

	}
})
</script>


<style type="text/css" lang="scss"    >

</style>