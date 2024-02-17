const userService = require('./user.service');
const jwtwebToken = require('jsonwebtoken');
const userRepository = require("../repository/user.repository");

jest.mock('jsonwebtoken')
jest.mock('../repository/user.repository')

describe('UserService', () => {
    describe('사용자 가입', () => {
        it('ClientId 로 회원가입이 정상 처리된다', async () => {
            userRepository.selectOneUserbyClientId.mockResolvedValueOnce(undefined)
            userRepository.createUser.mockResolvedValueOnce(undefined);

            const data = {
                clientId: 'c1',
                name: '홍길동',
                grade: 'user',
            }
            await userService.userSignUp(data);
        })

        it('ClientId 로 이미 존재하는 사용자는 가입할 수 없다.', async () => {
            userRepository.selectOneUserbyClientId.mockResolvedValueOnce({
                userId: 1,
            })

            const data = {
                clientId: 'c1',
                name: '홍길동',
                grade: 'user',
            }
            await expect(userService.userSignUp(data)).rejects.toMatchObject({
                code: 400,
                message: '이미 가입된 사용자 입니다.'
            })
        })

        it('email 로 회원가입이 정상 처리된다', async () => {
            userRepository.selectOneUserbyEmail.mockResolvedValueOnce(undefined)
            userRepository.createUser.mockResolvedValueOnce(undefined);

            const data = {
                email: 'a@b.com',
                password: 'aa',
                name: '홍길동',
                grade: 'user',
            }
            await userService.userSignUp(data);
        })

        it('email 로 회원이 이미 존재한다면 가입할 수 없다.', async () => {
            userRepository.selectOneUserbyEmail.mockResolvedValueOnce({
                userId: 1,
            })

            const data = {
                email: 'a@b.com',
                password: 'aa',
                name: '홍길동',
                grade: 'user',
            }
            await expect(userService.userSignUp(data)).rejects.toMatchObject({
                code: 400,
                message: '이미 가입된 이메일 입니다.'
            })
        })
    })

    describe('회원 로그인', () => {
        it('ClientId 를 통해 정상 로그인 처리', async () => {
            userRepository.selectOneUserbyClientId.mockResolvedValueOnce({
                userId: 1,
            })

            jwtwebToken.sign.mockReturnValueOnce('newAccessToken')
                .mockReturnValueOnce('newRefreshToken')

            const result = await userService.userSignIn({
                clientId: 'c1',
            })
            expect(result).toMatchObject({
                accessToken: 'newAccessToken',
                refreshToken: 'newRefreshToken'
            })
        })

        it('email, password 를 통해 정상 로그인 처리', async () => {
            userRepository.selectOneUserbyEmailAndPassword.mockResolvedValueOnce({
                userId: 1,
            })

            jwtwebToken.sign.mockReturnValueOnce('newAccessToken')
                .mockReturnValueOnce('newRefreshToken')

            const result = await userService.userSignIn({
                email: 'a@b.com',
                password: 'aa',
            })
            expect(result).toMatchObject({
                accessToken: 'newAccessToken',
                refreshToken: 'newRefreshToken'
            })
        })

        it('email, password 가 올바르지 않으면 로그인이 되지 않는다.', async () => {
            userRepository.selectOneUserbyEmailAndPassword.mockResolvedValueOnce(undefined)

            await expect(userService.userSignIn({
                email: 'a@b.com',
                password: 'aa',
            })).rejects.toMatchObject({
                code: 401,
                message: '올바르지 않은 로그인 정보입니다.'
            });
        })
    })
})