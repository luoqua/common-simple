<template>
	<div>
		<transition-group
			tag="div"
			name="widget-basic-list">
			<widget-basic v-for="(item,index) in basic" 
							:key="item.id"
							:length="basic.length" 
							v-model="index"
							@move="moveUpdown"
							@del="del"
							:title="item.title">
				<Radio />
				<Upload />
			</widget-basic>
		</transition-group>
	</div>
</template>



<script type="text/javascript">
import create from '@/utils/create'
import Radio from '@/components/radio/demo'
import Upload from '@/components/upload/demo'
import {move2downUp} from '@/utils/common.js'
import widgetBasic from '../index.vue'

export default create({
	name: 'widget-basic-demo',
	props: [],
	data() {
		return {
			basic: [
				{	
					id: 110,
					title: '页面标题'
				},
				{
					id: 111,
					title: '图片'
				},
				{
					id: 112,
					title: '页面标题'
				},
				{
					id: 113,
					title: '图片'
				},
				{
					id: 114,
					title: '页面标题'
				},
				{
					id: 115,
					title: '图片'
				}
			]
		}
	},
	components: {
		widgetBasic,
		Radio,
		Upload
	},
	methods: {
		moveUpdown(start,end) {
			this.basic = move2downUp(this.basic,start,end)
		},
		del(index) {
			this.basic.splice(index,1)
		}
	}
})
</script>


<style type="text/css" lang="scss">

</style>