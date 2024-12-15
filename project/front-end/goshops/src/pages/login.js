import React from 'react';
import { Input, Button, message } from 'antd';
import logo from '../assets/images/logo.png'
import axios from 'axios';
import './login.css';

const Login = () => {

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const handleLogin = () => {
      console.log(username);
      console.log(password);
      if (username === '') {
        message.error('用户名不能为空！');
        return;
      }
      if (password === '') {
        message.error('密码不能为空！');
        return;
      }
      axios.post('/user/login', null, {
        params: {
          account: username,
          password: password
        }
      })
     .then(res => {
        if (res.data.message === "登录成功") {
          localStorage.setItem('token', res.data.payload);
          localStorage.setItem('username', username);
          window.location.href = '/search';
        } else {
          message.error(res.data.message);
        }
      })
     .catch(err => {
        console.log(err);
      });
      // window.location.href = '/search';
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = () => {
    window.location.href = '/register';
  };

  const handleForgetPassword = () => {
    window.location.href = '/forget';
  };

  return (
    <div className = "Login">
      <header className = "Login-header">
        <div>
            <img 
            src={logo} 
            alt="logo"
            style={{ width: 150, height: 150, margin: '0 auto' }} />
            <h3>欢迎来到Price-wise!</h3>

            <p>登录Price-wise，开始您的购物之旅！</p>

            <Input 
            prefix = "用户名:" 
            size = "large" 
            style={{ width: 300 }}
            onChange = {handleUsername}
            placeholder="用户名" />
            <p/>
            <div>
            <Input.Password 
            prefix = "密码:" 
            size = "large" 
            style={{ width: 300, contentAlign: 'center' }} 
            onChange = {handlePassword}
            onPressEnter={handleLogin}
            placeholder="密码" />
            </div>
            <p/>

            <Button 
            onClick={handleLogin} 
            type="primary" 
            size="large" 
            style={{ width: 300 }}>登录</Button>
            <p/>

            <Button 
            type = "dashed" 
            size = "large" 
            style = {{ width: 300 }} 
            onClick={handleForgetPassword}>忘记密码?</Button>
            <p/>
            
            <Button 
            type = "dashed"
            size = "large"
            style = {{ width: 300 }}
            onClick={handleRegister}>注册新账户</Button>
        </div>
      </header>
    </div>
    );
};
  

export default Login;