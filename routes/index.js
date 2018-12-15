const express = require('express');
const router = express.Router();

// DB Import
const db = require('../lib/db');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('login', {

  });
});


// User Apply Page
router.get('/:userId', function (req, res, next) {
  let userId = req.params.userId;
  // GET Subject Data from DB
  db.query(`SELECT * FROM SUBJECT_DATA`, function (error, data) {
    if (error) {
      throw error;
    }

    res.render('index', {
      subjectData: data,
      userId: userId
    });
  });
});


// User Complete Page
router.get(`/:userId/complete`, function (req, res, next) {
  let userId = req.params.userId;
  // GET Apply Data
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

router.post(`/:userId/submit`, function (req, res, next) {
  let userId = req.params.userId;
  let sqlData = req.body.sql;

  let sql = `INSERT INTO USER_DATA (id, subjectCode, subjectName) VALUES ${sqlData}`;

  db.query(sql);
  console.log('success');
  console.log(sqlData);

  res.redirect(`/${userId}/complete`); //TODO :: goto Complete 화면
});

router.post('/membercheck', function (req, res, next) {
  let userId = req.body.id;
  console.log(userId);

  db.query(`SELECT 0 FROM USER_DATA WHERE id='${userId}'`, function (error, data) {
    if (error) {
      throw error;
    }
    if (data.length > 0) {
      console.log('EXIST!');
    } else {
      console.log('NEW MEMBER');
      res.redirect(`/${userId}`);
    }
  });
})

module.exports = router;