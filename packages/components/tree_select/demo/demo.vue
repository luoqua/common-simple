<template>
	<tree-select
		:items="items"
		@itemclick="onItemClick"
	/>
</template>

<script>
import treeSelect from '../index.vue'

export default {
	data() {
		return {
			data: [{
				group1: '区域',
				group2: '按区域',
				area1: [{
					text: '全部',
					id: 1001
				}, {
					text: '附近',
					id: 1002
				}, {
					text: '滨湖区',
					id: 1003
				}, {
					text: '新吴区',
					id: 1004
				}, {
					text: '锡山区',
					id: 1004
				}, {
					text: '宜兴市',
					id: 1004
				}, {
					text: '江阴市',
					id: 1004
				}, {
					text: '梁溪区',
					id: 1004
				}, {
					text: '常州市',
					id: 1004
				}]
			},
			{
				group1: '面积',
				area1: [{
					text: '不限',
					id: 1001
				}, {
					text: '80-90㎡',
					id: 1002
				}, {
					text: '90-100㎡',
					id: 1003
				}, {
					text: '100-110㎡',
					id: 1004
				}, {
					text: '110-120㎡',
					id: 1004
				}, {
					text: '120-130㎡',
					id: 1004
				}, {
					text: '130-140㎡',
					id: 1004
				}, {
					text: '140-180㎡',
					id: 1004
				}]
			},
			{
				group1: '类型',
				area1: [{
					text: '在建工地',
					id: 1001
				}, {
					text: '完工工地',
					id: 1002
				}]
			},
			{
				group1: '更多',
				area1: [{
					text: '在建工地',
					id: 1001
				}, {
					text: '完工工地',
					id: 1002
				}]
			}
			],
			nav_index: 5
		}
	},
	mounted() {

	},
	components: {
		treeSelect
	},
	computed: {
		items() {
			let itemsData = this.data
			let Oitems_field = [
			        'text',
			        'type',
			        'menu_index',
			        'sub_nav_index',
			        'children'
			      ]
			  
			itemsData = itemsData.map(function(items) {

		        let Oitems = {}
		        let options = items.group1 !== undefined && (items.group2 || items.group3)
		        let [
		            text,
		            type,
		            menu_index,
		            sub_nav_index,
		            children] = [items.group1,options ? 'menu_select': 'menu_list',0,'',options ? [{sub_text:items.group2,sub_children:items.area1}]:items.area1 ]
		          Oitems_field.forEach(function(item) {
		              Oitems[item] = eval(item)
		          })
		          return Oitems

      		})
			return itemsData
		}
	},
	methods: {
		onItemClick(data) {
	      console.log(data)
	    }
	}
}
</script>