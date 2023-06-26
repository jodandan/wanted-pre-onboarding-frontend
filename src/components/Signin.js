import React, { useState } from 'react';

export function Signin() {

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
        data-testid="signin-button"
        disabled={!isEmailValid || !isPasswordValid}
      >
        로그인
      </button>
    </div>
  );
}