<template>
	<toast
		:toast_result = "toast_result"
		:toast_text = 'toast_text'
	/>
</template>

<script>
import toast from '../index.vue'

export default{
	data() {
		return {
			toast_result: true,
			toast_text: '已经找到'
		}
	},
	components: {
		toast
	}
}
</script>

<style lang="scss" scoped>

</style>