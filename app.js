"use strict";

const { prototype } = require("events");

// 모듈
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const PORT = 3000;

// 라우팅
const home = require("./src/routes/home");

// 앱 세팅
app.set("views",[`${__dirname}/src/views/`,`${__dirname}/src/views/home`]);
app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/src/public`));
app.use(bodyParser.json());
// URL을 통해 전달되는 데이터에 한글, 공백 등과 같은 문자가 포함될 경우 제대로 인식하지 않는 문제 해결
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", home); // use > 미들웨어를 등록해주는 메서드.

module.exports = app;

const mysql = require('mysql');

const db = mysql.createConnection({
  host: "time-course.ceefgvcanxko.ap-northeast-2.rds.amazonaws.com",
  user: "root",
  password: "qwer1234",
  database: "nodedb",
});

// 라우터 미들웨어
const router = express.Router();

    // 입력 요청
    // 입력폼 (GET)
    router.get('/addBoard', (req,res) => {
        console.log('GET : /addBoard 입력폼 요청');
        res.render('addBoard');
    });
    // 입력처리 (POST)
    router.post('/addBoard', (req,res) => {
        console.log('POST : /addBoard 입력처리 요청');
        const board_pw = req.body.board_pw;
        const board_title = req.body.board_title;
        const board_content = req.body.board_content;
        const board_user = req.body.board_user;
        const board_date = req.body.board_date;
 
        db.query('INSERT INTO board(board_pw,board_title,board_content,board_user,board_date) VALUES(?,?,?,?,now())'
                ,[board_pw , board_title , board_content , board_user], (err, rs)=>{
            if(err) {
                console.log(err);
                res.end();
            }else {
                res.redirect('boardList');
            }
        });   
    });
    // 리스트 요청 (메인 페이지) (GET)
    router.get('/boardList', (req, res) => {
        console.log('GET : /boardList 리스트 요청 (메인 페이지)')
        res.redirect('boardList/1')
    })
    // 리스트 요청 (페이지 이동) (GET)
    router.get('/boardList/:currentPage', (req, res) => {
        console.log('GET : /boardList 리스트 요청 (페이지 이동)');
        let rowPerPage = 20;
        let currentPage = 1;
        if(req.params.currentPage){
            currentPage = parseInt(req.params.currentPage);
        }
        let beginRow = (currentPage-1) * rowPerPage;
        console.log(`currentPage : ${currentPage}`);
        let model = {};
        db.query('SELECT COUNT(*) AS cnt FROM board', (err, rs) => {
            if(err) {
                console.log(err);
                res.end();
            }else {
                console.log(`totalRow : ${rs[0].cnt}`);
                let totalRow = rs[0].cnt;
                var lastPage = totalRow / rowPerPage;
                if(totalRow % rowPerPage != 0) {
                    lastPage++;
                }
            }
            db.query('SELECT board_no, board_title, board_user FROM board ORDER BY board_no DESC LIMIT ?,?'
                    ,[beginRow,rowPerPage], (err, rs) => {
                if(err) {
                    console.log(err);
                    res.end();
                }else {
                    model.boardList = rs;
                    model.currentPage = currentPage;
                    model.lastPage = Math.floor(lastPage); // Math.floor() : 소수점 버림, 정수 반환
                    console.log('lastPage : ' + model.lastPage);
                    res.render('boardList',{model:model});
                }
            });
        });
    });

    // 게시판 상세내용 (GET)
    router.get('/boardDetail/:board_no', (req, res) => {
        console.log('GET : /boardDetail 상세내용 요청');
        if(!req.params.board_no){
            res.redirect('boardList');
        }else {
            db.query('SELECT board_no, board_title, board_content, board_user, board_date FROM board WHERE board_no=?'
                    ,[parseInt(req.params.board_no)], (err, rs) => {
                if(err) {
                    console.log(err);
                    res.end();
                }else {
                    res.render('boardDetail', {boardDetail:rs[0]});
                }
            });
        };
    });

    // 게시판 삭제
    // 삭제폼 (GET)
    router.get('/deleteBoard/:board_no', (req, res) => {
        console.log('GET : /deleteBoard 삭제폼 요청');
        const board_no = parseInt(req.params.board_no);
        console.log(board_no);
        res.render('deleteBoard',{deleteBoard:board_no});
    });
    // 삭제처리 (POST)
    router.post('/deleteBoard', (req, res) => {
        console.log('POST : /deleteBoard 삭제처리');
        const board_no = req.body.board_no;
        const board_pw = req.body.board_pw;
        db.query('DELETE FROM board WHERE board_no=? AND board_pw=?'
                ,[board_no, board_pw], (err, rs) => {
            if(err) {
                console.log(err);
                res.end();
            }else {
                res.redirect('boardList');
            }
        });
    });
// app.js(2)
    // 게시판 수정
    // 수정폼 (GET)
    router.get('/updateBoard/:board_no', (req, res) => {
        console.log('GET : /updateBoard 수정폼 요청');
        const board_no = parseInt(req.params.board_no);
        console.log('수정할 게시판 No : '+ board_no);
        db.query('SELECT board_no, board_pw, board_title, board_content, board_user FROM board WHERE board_no=?'
                ,[board_no], (err, rs) => {
            if(err) {
                console.log(err);
                res.end();
            }else {
                res.render('updateBoard', {updateBoard:rs[0]});
            }
        });
    });
    // 수정처리 (POST)
    router.post('/updateBoard', (req, res) => {
        console.log('POST : /updateBoard 수정처리 요청');
        const board_no = req.body.board_no;
        const board_pw = req.body.board_pw;
        const board_title = req.body.board_title;
        const board_content = req.body.board_content;
        db.query('UPDATE board SET board_title=?, board_content=? WHERE board_pw=? AND board_no=?'
                ,[board_title, board_content, board_pw, board_no], (err, rs) => {
            if(err) {
                console.log(err);
                res.end();
            }else {
                res.redirect('boardList');
            }
        });
    });
// 라우터 객체를 app객체에 등록
app.use('/', router);

// 미들웨어 설정 끝

