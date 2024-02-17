const authController = require('./auth.controller');
const authService = require("../service/auth.service");

jest.mock('../service/auth.service');

describe('AuthController', () => {
    describe('RefreshToken으로 새로운 accessToken 발급', () => {
        it('정상 발급된다', async () => {
            const responseData = {
                accessToken: 'newAccessToken',
                refreshToken: 'newRefreshToken',
            };
            const request = {
                body: {
                    refreshToken: 'oldRefreshToken'
                }
            }
            const response = {
                status: jest.fn(() => response),
                json: jest.fn(() => responseData),
            }

            authService.verifyFreshToken.mockResolvedValueOnce(responseData)

            const result = await authController.generateNewAccessTokenByFreshToken(request, response);
            console.log('result', result);
            expect(result).toMatchObject(responseData)
        })
    })
})