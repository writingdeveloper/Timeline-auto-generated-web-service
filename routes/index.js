const express = require('express');
const router = express.Router();

// DB Import
const db = require('../lib/db');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('login', {

  });
});


// User Page
router.get('/:userId', function (req, res, next) {
  let userId = req.params.userId;
  // GET Subject Data from DB
  db.query(`SELECT * FROM SUBJECT_DATA`, function (error, data) {
    if (error) {
      throw error;
    }

    res.render('index', {
      subjectData: data
    });
  });
});

router.post(`/:userId/submit`, function (req, res, next) {
  let userId=req.params.userId;
  
  let reqProfessor = req.body.reqProfessor; // 교수님에게 개인 요청 사항
  console.log(reqProfessor);
  console.log('success');
  res.redirect(`/${userId}`);
});

module.exports = router;