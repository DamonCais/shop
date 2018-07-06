<template>
	<div class="login">
		<div class="dialog">
			<h4>请重新登录</h4>
			<!-- <h5 style="color:red;">{{message}}</h5> -->
			<span @click="goBack" class="close">
				<i class="el-icon-close"></i>
			</span>
			<el-form :model="form" :rules="rules" ref="form" class="form" label-width="80px">
				<el-form-item prop="username" label="login">
					<el-input @keyup.enter="onLogin" v-model="form.username" placeholder="请输入用户名"></el-input>
				</el-form-item>
				<el-form-item :error="message" prop="password" label="password">
					<el-input @keyup.enter.native="onLogin" type="password" v-model="form.password" placeholder="请输入密码"></el-input>
				</el-form-item>
			</el-form>
			<div class="btns">
				<el-button @click="goBack">返回</el-button>
				<el-button type="primary" @click="onLogin">重新登录</el-button>
			</div>
		</div>
	</div>
</template>

<script>
import { login, logout, getInfo } from '@/api/login'
import { doPost, doGet, doDel } from '@/api/api'

export default {
	name: 'guzzuLogin',
	props: {
		username: {
			type: String,
			default: ''
		},
		message: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			form: {
				username: this.username,
				password: '',
			},
			rules: {
				username: [
					{ required: true, message: '用户名不能为空', trigger: 'blur' }
				],
				password: [
					{ required: true, message: '密码不能为空', trigger: 'blur' }
				]
			}

		}
	},
	methods: {
		goBack() {

		},
		onLogin() {
			let loginForm = this.form;
			this.$refs.form.validate((valid) => {
				if (valid) {
					this.message = '';
					this.$store.dispatch('Login', loginForm).then(() => {
						this.$emit('closed');
					}).catch((err) => {
						this.message = err.response.data.message;
						console.log(err.response.data.message);
						// this.$emit('close');
					})
				} else {
					console.log('error submit!!');
					return false;
				}
			});


		},
		goBack() {
			this.$store.dispatch('LogOut').then(() => {
				location.reload() // 为了重新实例化vue-router对象 避免bug
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.login {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1001;
  background: rgba(200, 200, 200, 0.6);
  // opacity: 0.3;
  .dialog {
    margin: 200px auto;
    width: 400px;
    height: 300px;
    background: #fff;
    // opacity: 1;
    border-radius: 10px;
    padding: 20px;
    text-align: center;
    z-index: 1;
    position: relative;
    h4 {
      margin: 30px auto 15px;
    }
    h5 {
      margin-top: 30px;
    }
    .close {
      position: absolute;
      right: 20px;
      top: 20px;
      font-size: 20px;
      cursor: pointer;
    }
    .form {
      padding: 10px 15px;
    }
    .btns {
      float: right;
      padding: 0 30px;
    }
  }
}
</style>
