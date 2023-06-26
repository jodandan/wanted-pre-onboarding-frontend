import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isEmailValid = email.includes('@');
  const isPasswordValid = password.length >= 8;

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/login', { email, password });
      const token = response.data.token;
      localStorage.setItem('token', token); // JWT를 로컬 스토리지에 저장

      console.log('로그인 성공:', response.data);
      // 로그인이 성공적으로 완료되면 /todo 경로로 이동합니다.
      navigate('/todo');
    } catch (error) {
      console.error('로그인 오류:', error);
    }
  };

  return (
    <div>
      <h2>로그인</h2>

        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          data-testid="email-input"
          placeholder="이메일"
        />
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          data-testid="password-input"
          placeholder="비밀번호"
        />
        <button
          type="submit"
          data-testid="signin-button"
          disabled={!isEmailValid || !isPasswordValid}
          onClick={handleSignin}
        >
          로그인
        </button>
    </div>
  );
}

export default Signin;
