<template>
	<div class="van-swipe-item" :style="style">
		<slot />
	</div>
</template>

<script>
export default{
	name: 'swipe-item',
	data() {
		return {
			offset: 0
		}
	},
	computed: {
		style() {
			const { vertical, width, height} = this.$parent

			return {
				width: width + 'px',
				height: vertical ? height + 'px' : '100%',
				transform: `translate${vertical ? 'Y' : 'X'}(${this.offset}px)`
			}
		}
	},
	beforeCreate() {
		this.$parent.swipes.push(this)
	},
	destoryed() {
		this.$parent.swipes.splice(this.$parent.swipes.indexof(this),1)
	}
}
</script>

<style lang="scss" scoped>
	
</style>