const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();

// Body-parser middleware
app.use(express.json());
app.use(cors());

// 임시로 저장할 회원 정보
let users = [];

// 미들웨어 함수: 토큰 검증 및 리다이렉트
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // 헤더에서 토큰 추출

  if (token) {
    jwt.verify(token, 'your-secret-key', (err, decoded) => {
      if (err) {
        // 토큰이 유효하지 않은 경우, /signin 경로로 리다이렉트
        res.redirect('/signin');
      } else {
        // 토큰이 유효한 경우, 다음 미들웨어 함수 호출
        req.user = decoded;
        next();
      }
    });
  } else {
    // 토큰이 없는 경우, /signin 경로로 리다이렉트
    res.redirect('/signin');
  }
};

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

app.get('/signin', verifyToken, (req, res) => {
  res.send('Signin Page');
});

// 서버를 실행합니다.
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
