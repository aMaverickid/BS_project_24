import React, { useEffect } from 'react';
import { Input, Button, Typography, message } from 'antd';
import axios from 'axios';
const { Link: AntLink } = Typography;

const Register = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [code, setCode] = React.useState('');
  const [seconds, setSeconds] = React.useState(60);
  const [timerActive, setTimerActive] = React.useState(false);

  useEffect(() => {
    let timer;
    if (timerActive && seconds > 0) {
      timer = setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      setTimerActive(false);
      clearInterval(timer);
      setSeconds(60);
    }
    return () => clearTimeout(timer);
  }, [seconds, timerActive]);

  const handleUsername = (e) => {
    setUsername(e.target.value);
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleEmail = (e) => {
    setEmail(e.target.value);
  }

  const handleCode = (e) => {
    setCode(e.target.value);
  }

  const handleSendCode = () => {
    console.log(email);
    if (email === '') {
      message.error('邮箱不能为空');
      return;
    }
    axios.get('/user/send_email', {
      params: {
        email: email
      }
    })
    .then(res => {
      if (res.data.message === '发送成功'){
        localStorage.setItem('reset_token', res.data.payload);
        console.log(res.data);
        console.log(res.data.payload);
        message.success('验证码已发送');
        setTimerActive(true);
      }
      else
        message.error(res.data.message);
    })
   .catch(error => {
      console.log(error);
    });
  }

  const handlerRegister = () => {
    console.log(username);
    console.log(localStorage.getItem('reset_token'));
    if (username === '') {
      message.error('用户名不能为空');
      return;
    }
    if (password === '') {
      message.error('密码不能为空');
      return;
    }
    if (email === '') {
      message.error('邮箱不能为空');
      return;
    }
    if (code === '') {
      message.error('验证码不能为空');
      return;
    }
    if (!localStorage.getItem('reset_token')) {
      localStorage.setItem('reset_token', '');
    }
    axios.post('/user/register', null,{
      params: {
        account: username,
        password: password,
        email: email,
        code: code,
        jwt_value: localStorage.getItem('reset_token')
      }
    })
   .then(res => {
      if (res.data.message === "注册成功") {
        message.success('注册成功，请返回登录页面进行登录');
        setTimeout(() => {
          window.location.href = '/login';
        }, 1000);
      } else {
        message.error(res.data.message);
      }
    })
   .catch(err => {
      console.log(err);
    });
    
  }

  return (
    <div className = "Login">
      <header className = "Login-header">
        <div>
          <h3>注册您的新账号，开启购物之旅！</h3>
          <Input 
            prefix = "用户名:" 
            size = "large" 
            style={{ width: "80%" }} 
            onChange={handleUsername}
            placeholder="用户名不可少于6位" />
            <p />

            <Input.Password
            prefix = "密码:" 
            size = "large" 
            type="password" 
            style={{ width: "80%" }} 
            onChange={handlePassword}
            placeholder="密码不可少于6位" />
            <p />

            <div>
              <Input 
              prefix = "邮箱:" 
              size = "large" 
              style={{ width: "55%" }} 
              onChange={handleEmail}
              onPressEnter={handlerRegister}
              placeholder="邮箱" />
            <Button 
                disabled={timerActive}
                type="primary" 
                size="large" 
                style={{marginLeft: "3%", fontColor: "white"}}
                onClick={handleSendCode}>{timerActive ? "验证码已发送(" + seconds + "s)" : "发送验证码"}</Button>
            </div>
            <p />

            <div>
            <Input 
              prefix = "验证码:" 
              size = "large" 
              style={{ width: "80%" }} 
              onChange={handleCode}
              onPressEnter={handlerRegister}
              placeholder="验证码" />
            </div>
            <p />

            <Button 
            type="primary" 
            size="large" 
            style={{ width: "80%" }}
            onClick={handlerRegister}>注册</Button>
            <p />

            <AntLink href="/login">已有账号？点此登录</AntLink>
        </div>
      </header>
    </div>
    );
}
export default Register;