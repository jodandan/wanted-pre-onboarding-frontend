import React, { useState } from 'react';

export function Signup() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isEmailValid = email.includes('@');
  const isPasswordValid = password.length >= 8;

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // 여기서 로그인 처리 로직을 수행하면 됩니다.
    console.log('Signin:', email, password);
  };

  return (
    <div>
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
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
          disabled={!isEmailValid || !isPasswordValid}
        >
          회원가입
        </button>
      </form>
    </div>
  );
}