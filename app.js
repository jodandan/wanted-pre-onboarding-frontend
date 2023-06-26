const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();

// Body-parser middleware
app.use(express.json());
app.use(cors());

// 임시로 저장할 회원 정보
let users = [];

// 회원가입 라우트 핸들러
app.post('/api/signup', (req, res) => {
  const { email, password } = req.body;
  console.log('Received signup request:', { email, password });

  // 이메일 중복 체크
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(400).json({ error: '이미 가입된 이메일입니다.' });
  }

  // 회원 정보 저장
  const newUser = { email, password };
  users.push(newUser);

  // JWT 생성
  const token = jwt.sign({ email }, 'your-secret-key');

  // 회원가입이 정상적으로 처리되었다는 응답을 보냅니다.
  res.status(200).json({ token });
});

// 로그인 라우트 핸들러
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // 이메일과 비밀번호 일치 여부 체크
  const user = users.find((user) => user.email === email && user.password === password);
  if (!user) {
    return res.status(401).json({ error: '이메일 또는 비밀번호가 올바르지 않습니다.' });
  }

  // JWT 생성
  const token = jwt.sign({ email }, 'your-secret-key');

  // 로그인이 성공적으로 처리되었다는 응답을 보냅니다.
  res.status(200).json({ token });
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// 서버를 실행합니다.
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
