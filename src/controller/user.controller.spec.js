import userContoller from './user.controller.js';
import userService from '../service/user.service.js';

jest.mock('../service/user.service');

describe('UserController', () => {
    describe('회원가입', () => {
        it('clientId 를 통한 정상 회원가입', async () => {
            const responseData = [{
                name: 'foo',
            }];
            const request = {
                body: { clientId: 'c1', name: 'foo', grade: 'user' }
            }
            const response = {
                status: jest.fn(() => response),
                json: jest.fn(() => responseData),
            }

            userService.userSignUp.mockResolvedValueOnce(undefined)

            const result = await userContoller.userSignUp(request, response);
            expect(result).toMatchObject(responseData)
        })
    })

    describe('로그인', () => {
        it('clientId 를 통한 정상 로그인', async () => {
            const responseData = {
                accessToken: 'a',
                refreshToken: 'f',
            }
            const request = {
                body: { clientId: 'c1' }
            }
            const response = {
                status: jest.fn(() => response),
                json: jest.fn(() => responseData),
            }

            userService.userSignIn.mockResolvedValueOnce(responseData)

            const result = await userContoller.userSignUp(request, response);
            expect(result).toMatchObject(responseData)
        })
    })


    describe('내 정보 조회', () => {
        it('locals 의 정보 조회', async () => {
            const responseData = {
                name: 'foo',
            }
            const request = {}
            const response = {
                status: jest.fn(() => response),
                json: jest.fn(() => responseData),
                locals: {
                    user: {
                        userId: 1,
                        name: 'foo',
                    }
                }
            }

            const result = await userContoller.getMyInfo(request, response);
            expect(result).toMatchObject(responseData)
        })
    })
})