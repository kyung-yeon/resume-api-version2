const express = require('express');
const jwtValidate = require('../middleware/jwt-validate.middleware');
const userController = require('../src/controller/user.controller');

const router = express.Router();

/**
 * @swagger
 * /users/sign-up:
 *   post:
 *     summary: 회원가입 API
 *     description: 카카오 로그인이나 이메일/패스워드를 통해 회원가입을 시도하는 API
 *     parameters:
 *       - in: body
 *         type: object
 *         description: 회원가입 요청 body data
 *         schema:
 *           properties:
 *             email:
 *               type: string
 *               descriptoin: 이메일
 *               example: 'a@com'
 *               required: false
 *             clientId:
 *               type: string
 *               descriptoin: 카카오 로그인했을 경우 카카오 클라이언트 아이디
 *               example: 'kdjalkfjaewpwoepq91129123'
 *               required: false
 *             password:
 *               type: string
 *               descriptoin: 이메일 로그인일 경우 비밀번호
 *               example: '123123'
 *               required: false
 *             passwordConfirm:
 *               type: string
 *               descriptoin: 이메일 로그인일 경우 비밀번호 확인
 *               example: '123123'
 *               required: false
 *             name:
 *               type: string
 *               descriptoin: 이름
 *               example: '홍길동'
 *               required: true
 *             grade:
 *               type: string
 *               descriptoin: 회원 등급 (기본값 user, 인사담당자 admin)
 *               example: 'user'
 *               required: false
 * 
 *     responses:
 *       '201':
 *         description: 정상적인 회원가입 완료
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email: 
 *                   type: string
 *                   description: 가입 이메일
 *                   required: false
 *                 name:
 *                   type: string
 *                   description: 가입 이름
 *                   required: true
 *  
 *       '400':
 *         description: 정상적인 회원가입 완료
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: 
 *                   type: boolean
 *                   description: 성공 완료 여부
 *                   required: true
 *                 message:
 *                   type: string
 *                   description: 오류 메시지
 *                   required: true
 */
router.post('/sign-up', userController.userSignUp)

router.post('/sign-in', userController.userSignIn)

router.get('/me', jwtValidate, userController.getMyInfo)

module.exports = router;