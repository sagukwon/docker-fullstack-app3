// 필요한 모듈들 가져오기
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

// Express 서버 생성
const app = express();

// json 형태로 오는 요청의 본문을 해석해 줄 수 있도록 등록
app.use(bodyParser.json());

// DB 테이블 생성하기
// db.pool.query ('CREATE TABLE LISTS ( \
//     id INTEGER AUTO_INCREMENT, \
//     value TEXT, \
//     PRIMARY KEY (id) \
//     )', (err, results, fileds) => {
//         console.log('results', results)
//     })

// DB 테이블에 있는 데이터를 프론트 서버에 보내주기
app.get('/api/values', function(req, res) {

    db.pool.query('SELECT * FROM lists;',
    (err, results, fileds) => {
        if (err)
            return res.status(500).send(err)
        else
            return res.json(results)
    })
})

// 클라이언트에서 입력한 값을 DB 테이블에 넣어주기
app.post('/api/value', function(req, res, next) {

      db.pool.query('INSERT INTO lists (value) VALUES ("' + req.body.value +'")',

    // db.pool.query('INSERT INTO lists (value) VALUES ("안녕하세요")',
        (err, results, fileds) => {
            if(err)
                return res.status(500).send(err)
            else {
                console.log(req.body.value);
                return res.json({ success: true, value: req.body.value })
            }
        })
    })

// 어플리케이션 실행
app.listen(5000, () => {
    console.log('어플리케이션이 서버 5000번 포트에서 시작되었습니다');
})