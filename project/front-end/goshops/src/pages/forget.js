import React, { useEffect } from 'react';
import { Input, Button, message } from 'antd';
import axios from 'axios';

const Forget = () => {
  const [email, setEmail] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [code, setCode] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [seconds, setSeconds] = React.useState(60);
  const [timerActive, setTimerActive] = React.useState(false);
  const [confirmpassword, setConfirmPassword] = React.useState('');

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

  const handleSendCode = () => {
    if (email === '') {
      message.error('邮箱不能为空');
      return;
    }
    console.log(email);
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

  const handleSubmit = () => {
    if (username === '') {
      message.error('账户不能为空');
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
    if (password === '') {
      message.error('密码不能为空');
      return;
    }
    if (password.length < 6) {
      message.error('密码不可少于6位');
      return;
    }
    if (confirmpassword !== password) {
      message.error('两次密码输入不一致');
      return;
    }
    axios.post('/user/reset_password', null, {
      params: {
        account: username,
        email: email,
        code: code,
        new_password: password,
        jwt_value: localStorage.getItem('reset_token')
      }
    })
   .then(res => {
      if (res.data.message === '重置密码成功'){
        localStorage.removeItem('reset_token');
        message.success('密码重置成功，请重新登录');
        setTimeout(() => {
          window.location.href = '/login';
        }, 1000);
      }
      else
        message.error(res.data.message);
    })
   .catch(error => {
      console.log(error);
   });
  }

  const handleBack = () => {
    window.location.href = '/login';
  }


  return (
    <div className = "Login">
      <header className = "Login-header">
        <div>
          <h2>忘记密码</h2>
          <h3>通过邮箱验证码重置密码！</h3>
          <div>
            <Input
                prefix="账户:"
                size="large"
                placeholder="账户"
                onChange = {(e) => setUsername(e.target.value)}
                />
          </div>
          <div style={{display: 'flex', marginTop: "5%"}}>
            <Input
                prefix="邮箱:"
                size="large"
                style={{width: "75%"}}
                placeholder="邮箱"
                onChange = {(e) => setEmail(e.target.value)}
                />
            <Button 
                disabled={timerActive}
                type="primary" 
                size="large" 
                style={{marginLeft: "5%"}}
                onClick={handleSendCode}>{timerActive ? "验证码已发送(" + seconds + "s)" : "发送验证码"}</Button>
          </div>
          <div>
            <Input
                prefix="验证码:"
                size="large"
                style={{ marginTop: "5%"}}
                placeholder="验证码"
                onChange = {(e) => setCode(e.target.value)}
            />
          </div>
          <div style={{marginTop: "5%"}}>
            <Input.Password
                prefix="新密码:"
                size="large"
                placeholder="密码不可少于6位"
                onChange = {(e) => setPassword(e.target.value)}
                // onPressEnter={handleSubmit}
                />
          </div>
          <div style={{marginTop: "5%"}}>
            <Input.Password
                prefix="确认密码:"
                size="large"
                placeholder="密码不可少于6位"
                onChange = {(e) => setConfirmPassword(e.target.value)}
                // onPressEnter={handleSubmit}
                />
          </div>
          <Button
              type="primary"
              size="large"
              disabled={password !== confirmpassword}
              style={{marginLeft: 20, marginTop: "5%"}}
              onClick={handleSubmit}>提交</Button>
          <Button
              type="primary"
              size="large"
              style={{marginLeft: 20, marginTop: "5%"}}
              onClick={handleBack}>返回登录界面</Button>
        </div>
      </header>
    </div>
  );
}

export default Forget;