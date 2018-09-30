<template>
	<div :class="b()">
		<div :class="b('modinput')">
			<div >
			  <input type="text" v-model=value :class="b('textInput')" :placeholder="labelName" name="">
			</div>
		</div>
		<span :class="b('inputlimit')">
			<span aria-hidden="true" :class="failClass">{{string_length}}/{{lengthLimit}}</span>
		</span>
		<p   :class="b('msgfail')" v-if="msgfail">{{msgfail}}</p>
		<div :class="b('formTip')" v-if="formTip">{{formTip}}</div>
	</div>
</template>


<script type="text/javascript">
import create from '@/utils/create'

export default create({
	name: 'input',
	props: {
		labelName: {
			type: String
		},
		lengthLimit: {
			type: Number,
			default: 10
		},
		formTip: {
			type: String,
			default: '用于记录生成页'
		}
	},
	data() {
		return {
			value: '一二'
		}
	},
	computed: {
		string_length() {

			if (this.value.toString().length === 1) {
				return 1
			}

			return Math.floor(this.value.toString().replace(/[^\x00-\xff]/g,'aaaa').length / 2)
		},
		msgfail() {
			if (/&/g.test(this.value)) {
				return '不能包含以下特殊字符：&'
			}
			if (this.string_length > this.lengthLimit) {
				return `必须为1-${this.lengthLimit}个字`
			}
			return ''
		},
		failClass() {
			return {
				[this.b('limitfail')]: this.string_length > this.lengthLimit
			}
		}
	},
	methods: {

	}
})
</script>


<style type="text/css" lang="scss" scoped>
	.simple-input{
		font-size: 14px;
		$p:&;
		#{$p}__modinput{
			position: relative;
			display: inline-block;
			width: 320px;
			flex: 1 1 0%;
			div{
				position: relative;
			}
			#{$p}__textInput{
				font-family: inherit;
				font-size: inherit;
			    margin: 0;
				box-sizing: border-box;
			    padding: 4px 10px;
			    width: 100%;
			    color: #2c2d2e;
			    height: 36px;
			    line-height: 1;
			    background-color: #fff;
			    box-shadow: inset 0 0 0 1px #d3d4d6;
			    border: none;
			    border-radius: 3px;
			    outline: none;
			    -webkit-appearance: none;
			    appearance: none;
			    &:focus{
			    	box-shadow: inset 0 0 0 1px #bec0c2;
			    }
			}
		}
		#{$p}__formTip{
			margin-top: 8px;
		    font-size: 13px;
		    line-height: 22px;
		    color: #8f9196;
		}
		#{$p}__msgfail{
			margin-top: 5px;
			color: #e15f63;
		}
		#{$p}__inputlimit{
			display: inline-block;
		    margin-left: 8px;
		    font-size: 13px;
		    outline: none;
		    color: #8f9196;
		}
		#{$p}__limitfail{
			color: #e15f63;
		}
	}
</style>