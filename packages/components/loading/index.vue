<template>
	<section v-if="loading">
		<section class="component-loading">
			<section class="loadings">
				<section v-for="i in 8" class="loading-list"></section>
			</section>
		<section class="toast_text">{{ loading_text }}</section>
		</section>
		<section class="toast_mask"></section>
	</section>
</template>

<script>
export default {
	name: 'loading',
	props: {
		loading: {
			type: Boolean,
			default: false
		},
		loading_text: {
			type: String,
			default: '正在加载中'
		}
	}
}
</script>

<style  lang="scss" scoped>
	@import '../../styles/loading';
</style>