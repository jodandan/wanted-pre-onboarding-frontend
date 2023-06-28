import React, { useState, useEffect } from 'react'; // useEffect 임포트 추가
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isEmailValid = email.includes('@');
  const isPasswordValid = password.length >= 8;

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/todo');
    }
  }, [navigate]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
   
  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/signup', { email, password });
      const token = response.data.token;
      localStorage.setItem('token', token); // JWT를 로컬 스토리지에 저장

      console.log('회원가입 성공:', response.data);
      // 회원가입이 성공적으로 완료되면 /signin 경로로 이동합니다.
      navigate('/signin');
    } catch (error) {
      console.error('회원가입 오류:', error);
    }
  };

  return (
    <div>
      <h2>회원가입</h2>
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
          data-testid="signup-button"
          onClick={handleSignup}
          disabled={!isEmailValid || !isPasswordValid}
        >
          회원가입
        </button>
    </div>
  );
}

export default Signup;
