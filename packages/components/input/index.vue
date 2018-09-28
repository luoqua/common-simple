<template>
	<div :class="b()">
		<label :class="b('label')">{{label_name}}</label>
		<div :class="b('modform')">
			<div :class="b('modflex')">
				<div :class="b('modinput')">
					<div >
					  <input type="text" v-model=value :class="b('textInput')" :placeholder="label_name" name="">
					</div>
				</div>
				<span :class="b('inputlimit')">
					<span aria-hidden="true" :class="failClass">{{string_length}}/{{length_limit}}</span>
				</span>
			</div>
			<p :class="b('msgfail')" v-if="msgfail !== ''">{{msgfail}}</p>
			<div :class="b('formTip')">{{formTip}}</div>
		</div>
	</div>
</template>


<script type="text/javascript">
import create from '@/utils/create'

export default create({
	name: 'input',
	props: [],
	data() {
		return {
			label_name: '页面名称',
			value: '一二',
			length_limit: 10,
			formTip: '用于创建广告时选择原生推广页，不会对用户展现。'
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
			if (this.string_length > this.length_limit) {
				return `必须为1-${this.length_limit}个字`
			}
			return ''
		},
		failClass() {
			return {
				[this.b('limitfail')]: this.msgfail !== ''
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
		margin-bottom: 28px;
		padding-top: 50px;
		$p:&;
		&__label{
			position: relative;
		    float: left;
		    width: 6em;
		    margin-top: .3em;
		    margin-right: 28px;
		    font-size: 14px;
			margin-left: 16px;
			margin-top: 0.3em;
		}
		&__modform{
			display: table-cell;
		    vertical-align: top;
		    float: none;
		    width: auto;
		    #{$p}__modflex{
				display: inline-flex;
				align-items: center;
				width: initial;
				#{$p}__modinput{
					position: relative;
					display: inline-block;
					width: 320px;
					flex: 1 1 0%;
					div{
						position: relative;
					}
				}
		    }
		}
		&__textInput{
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
		&__inputlimit{
			display: inline-block;
		    margin-left: 8px;
		    font-size: 13px;
		    outline: none;
		    color: #8f9196;
		}
		&__formTip{
			margin-top: 8px;
		    font-size: 13px;
		    line-height: 22px;
		    color: #8f9196;
		}
		&__msgfail{
			margin-top: 5px;
			color: #e15f63;
		}
		&__limitfail{
			color: #e15f63;
		}

	}
</style>