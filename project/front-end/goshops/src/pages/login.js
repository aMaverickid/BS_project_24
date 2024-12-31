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
      // 用户名、密码要求在6字节以上
      if (username.length < 6) {
        message.error('用户名长度不能小于6个字符！');
        return;
      }
      if (password.length < 6) {
        message.error('密码长度不能小于6个字符！');
        return;
      }
      axios.post('/user/login', null, {
        params: {
          name: username,
          password: password
        }
      })
     .then(res => {
        if (res.data.messageString === "登录成功") {
          localStorage.setItem('token', res.data.payLoad);
          localStorage.setItem('username', username);
          window.location.href = '/search';
        } else {
          message.error(res.data.messageString);
        }
      })
     .catch(err => {
        console.log(err);
      });      
  };

  const handleRegister = () => {
    window.location.href = '/register';
  };

  // const handleForgetPassword = () => {
  //   window.location.href = '/forget';
  // };
  const handleGuestLogin = () => {
    window.location.href = '/search';
  }

  return (
    <div className="Login">
      <header className="Login-header">
        <div>
          <img 
            src={logo} 
            alt="logo"
            style={{ width: 150, height: 150, margin: '0 auto' }} 
          />
          <h2>Goshops</h2>

          <p>Goshops, 你的商品比价平台</p>

          <Input 
            prefix="Username:" 
            size="large" 
            style={{ width: 300 }}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username" 
          />
          <p/>
          <div>
            <Input.Password 
              prefix="Password:" 
              size="large" 
              style={{ width: 300, contentAlign: 'center' }} 
              onChange={(e) => setPassword(e.target.value)}
              onPressEnter={handleLogin}
              placeholder="Enter your password" 
            />
          </div>
          <p/>

          <Button 
            onClick={handleLogin} 
            type="primary" 
            size="large" 
            style={{ width: 300 }}>登录</Button>
          <p/>

          <Button 
            type="dashed" 
            size="large" 
            style={{ width: 300 }} 
            onClick={handleGuestLogin}>游客登录 </Button>
          <p/>

          <Button 
            type="dashed"
            size="large"
            style={{ width: 300 }}
            onClick={handleRegister}>注册</Button>
        </div>
      </header>
    </div>
    );
};
  

export default Login;