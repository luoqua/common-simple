<template>
	<div class="simple-wrapper">
		<div class="simple-header">
			<simple-navbar></simple-navbar>
			<simple-tags-view></simple-tags-view>
		</div>
		<simple-main class="simple-main-container">
		</simple-main>
		<simple-sidebar class="simple-sidebar-container"></simple-sidebar>
	</div>
</template>



<script type="text/javascript">

import create from '@/utils/create'

import { SimpleNavbar, SimpleTagsView, SimpleMain, SimpleSidebar } from './components'

export default create({
	name: 'Layout',
	props: [],
	data() {
		return {
		}
	},
	components: {
		SimpleNavbar,
		SimpleTagsView,
		SimpleMain,
		SimpleSidebar
	},
	methods: {

	}
})
</script>


<style lang="scss" scoped>
	
	.simple-header {
		width: 100%;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		border-bottom: 1px solid #eaeefb;
	}
	
</style>