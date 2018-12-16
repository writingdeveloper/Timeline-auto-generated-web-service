const express = require('express');
const router = express.Router();
// 데이터베이스 설정파일 Import
const db = require('../lib/db');

/* 메인페이지 라우터 (login) */
router.get('/', function (req, res, next) {
  res.render('login', {});
});

/* 수강신청 페이지 라우터 */
router.get('/:userId', function (req, res, next) {
  let userId = req.params.userId;
  // 전체 과목데이터를 DB로 부터 받아옴
  db.query(`SELECT * FROM SUBJECT_DATA`, function (error, data) {
    if (error) {
      throw error;
    }
    // 배열화된 과목데이터를 HTML Template으로 전달
    res.render('index', {
      subjectData: data,
      userId: userId
    });
  });
});

/* 수강신청 완료 페이지 라우터 */
router.get(`/:userId/complete`, function (req, res, next) {
  let userId = req.params.userId;
  // URL의 userId값을 읽은 이후 DB에서 해당 ID로 조회한 수강신청 완료DB를 받아옴
  db.query(`SELECT * FROM USER_DATA WHERE id='${userId}'`, function (error, data) {
    if (error) {
      throw error;
    }
    res.render('complete', {
      userId: userId,
      dataArray: data
    });
  });
});

/* 수강 신청 제출 라우터 POST */
router.post(`/:userId/submit`, function (req, res, next) {
  let userId = req.params.userId;
  // body값에서 id값이 sql인 데이터를 저장
  let sqlData = req.body.sql;
  // SQL 문 완성
  let sql = `INSERT INTO USER_DATA (id, subjectCode, subjectName) VALUES ${sqlData}`;
  // 쿼리 실행
  db.query(sql);
  console.log('success');
  console.log(sqlData);
  // 수강신청 완료 페이지로 Redirect
  res.redirect(`/${userId}/complete`);
});

/* 메인페에지에서 회원중복 체크 라우터 POST */
router.post('/membercheck', function (req, res, next) {
  // 입력된 input 태그 값을 저장
  let userId = req.body.id;
  console.log(userId);
  // DB에서 해당 ID로 수강신청한 데이터가 있는지 확인
  db.query(`SELECT 0 FROM USER_DATA WHERE id='${userId}'`, function (error, data) {
    if (error) {
      throw error;
    }
    // 수강신청한 데이터가 있을경우 해당 ID의 수강신청 완료페이지로 Redirect
    if (data.length > 0) {
      console.log('EXIST!');
      res.redirect(`/${userId}/complete`)
      // 수강신청한 데이터가 없을경우 새로운 수강신청으로 간주 후 해당 ID의 수강신청 페이지로 Redirect
    } else {
      console.log('NEW MEMBER');
      res.redirect(`/${userId}`);
    }
  });
})

module.exports = router;