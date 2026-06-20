// 외부 패키지
const cookies = require("cookie-parser");
const cors = require("cors");
const express = require("express");

// 프로젝트 내부 (models → routes)
const db = require("./models");
const diaryRouter = require('./routes/diary');
const habitRouter = require('./routes/habit');
const statsRouter = require('./routes/stats');
const userRouter = require('./routes/user');

const app = express();

// db 연결 (force 쓰면 테이블 다 지우고 다시 만듦)
db.sequelize.sync().then(() => {
  console.log("db 연결 성공");
}).catch(console.error);

// cors, body 파싱, 쿠키
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookies());

// 라우트
app.use("/user", userRouter);
app.use("/diary", diaryRouter);
app.use("/habit", habitRouter);
app.use("/stats", statsRouter);

app.get("/", (req, res) => {
  res.status(200).json("server 실행중");
});

// 전역 에러 핸들러 (next(err) 로 넘어온 에러)
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status ?? err.statusCode ?? 500;
  const message = err.message ?? '서버 에러가 발생했습니다.';
  res.status(typeof status === 'number' ? status : 500).json({ error: message });
});

app.listen(process.env.BACK_PORT, () => {
  console.log(`app is listening on ${process.env.BACK_PORT} port`);
});
