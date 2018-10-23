<template>
	<my-checkbox v-model="foo" value="some value"></my-checkbox>
</template>


<script type="text/javascript">
import create from '@/utils/create'

export default create({
	name: 'component_test',
	props: [],
	data() {
		return {
			foo: 1
		}
	},
	components: {
		'my-checkbox': {
			model: {
				prop: 'checked',
				event: 'change'
			},
			props: {
			// 这里可以使用prop中的value来进行其他操作
				value: String,
				// 这里可以用checked当成prop代替value
				checked: {
					type: Number,
					default: 0
				}
			},
			methods: {
				onChange(value) {
					this.$emit('change',2)
				}
			},
			mounted() {
				console.log(this.value)
				console.log(this.checked)
			},
			computed: {
				color() {
					return {
						color: this.checked ? 'red' : '#000'
					}
				}
			},
			watch: {
				checked() {
					console.log(this.checked)
				}
			},
			template: '<div><input type="checkbox" @change="onChange"/><label :style="color">123123</label></div>'
		}
	},
	methods: {
		change(value) {
			console.log(1)
			console.log(value)
		}
	}
})
</script>


<style type="text/css" lang="scss">

</style>