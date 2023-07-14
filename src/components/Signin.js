import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 300px;
  padding: 10px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #0056b3;
  }
`;

function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const isEmailValid = email.includes('@');
  const isPasswordValid = password.length >= 8;

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
      localStorage.setItem('token', token);

      console.log('로그인 성공:', response.data);
      history.push('/todo');
    } catch (error) {
      console.error('로그인 오류:', error);
    }
  };

  return (
    <FormContainer>
      <Title>로그인</Title>
      <Input
        type="email"
        value={email}
        onChange={handleEmailChange}
        data-testid="email-input"
        placeholder="이메일"
      />
      <Input
        type="password"
        value={password}
        onChange={handlePasswordChange}
        data-testid="password-input"
        placeholder="비밀번호"
      />
      <Button
        type="submit"
        data-testid="signin-button"
        disabled={!isEmailValid || !isPasswordValid}
        onClick={handleSignin}
      >
        로그인
      </Button>
    </FormContainer>
  );
}

export default Signin;
