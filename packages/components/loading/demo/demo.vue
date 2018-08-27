<template>
	<loading
	:loading = 'loading'
	:loading_text = 'loading_text'
	/>
</template>

<script>
import loading from '../index.vue'

export default {
	data() {
		return {
			loading: true,
			loading_text: '正在加载中'
		}
	},
	components: {
		loading
	}
}
</script>

>