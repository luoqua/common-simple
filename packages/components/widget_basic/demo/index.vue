<template>
	<div>
		<widget-basic v-for="(i,index) in 2" :key="index" v-model="index">
			<Radio />
			<Upload />
		</widget-basic>
	</div>
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
			basic_num: 2,
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