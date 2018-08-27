<template>
	<section class="toast" >
		<transition name="toast-fade">
			<p class="text" v-if="toast">{{toast_text}}</p>
		</transition>
	</section>
</template>

<script>
export default{
	name: 'toast',
	props: {
		toast_result: {
			type: Boolean,
			default: false
		},
		toast_text: {
			type: String,
			default: '成功'
		},
		fade_time: {
			type: Number,
			default: 800
		}
	},
	data() {
		return {
			toast: false
		}
	},
	created() {
		let that = this

		that.toast = that.toast_result

		setTimeout(function() {
			that.toast = false
		},that.fade_time)
	}
}
</script>

<style lang="scss" scoped>
$num: 100;
.toast{
	.toast-fade-enter-active {
	  transition: all .3s ease;
	}
	.toast-fade-leave-active {
	  transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
	}
	.toast-fade-enter, .toast-fade-leave-to
	/* .slide-fade-leave-active for below version 2.1.8 */ {
	  opacity: 0;
	}

	.text{
		padding:0.2rem 0.3rem;
		background-color: rgba(51,51,51,.9);
		position: fixed;
		bottom: 10%;
		left: 50%;
		-webkit-transform: translate(-50%,-50%);
		border-radius:0.1rem;
		color: #ffffff;
		margin-top: 0.06rem;
	    font-size: 0.1rem;
	    line-height: 1.2;
	}
	.toast_mask{
		background:rgba(0,0,0,0.3);
		z-index: 98;
		width: 100%;
		left: 100%;
		position: fixed;
		top: 0px;
		left: 0px;
		right: 0px;
		bottom: 0px;
		margin: 0 auto;
	}
}
</style>