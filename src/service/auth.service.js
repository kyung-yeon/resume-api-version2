const jwtwebToken = require('jsonwebtoken');
const userRepository = require('../repository/user.repository');
const { GLOBAL_REFRESH_TOKEN } = require('../../refresh-token');
const { redisCache } = require('../redis/index');

class AuthService {
    verifyAccessToken = async (accessToken) => {
        const token = jwtwebToken.verify(accessToken, 'resume@#');

        // accessToken 안에 userId 데이터가 잘 들어있는가?
        if (!token.userId) {
            throw new Error('인증 정보가 올바르지 않습니다.');
        }

        const user = await userRepository.findOneUserByUserId(token.userId);

        if (!user) {
            throw new Error('인증 정보가 올바르지 않습니다.');
        }

        return user;
    }

    verifyFreshToken = async (refreshToken) => {
        const token = jwtwebToken.verify(refreshToken, 'resume&%*');
        if (!token.userId) {
            throw {
                code: 401,
                message: '토큰 정보가 올바르지 않습니다.'
            }
        }

        const redis = await redisCache.get(`REFRESH_TOKEN:${token.userId}`);

        if (!redis || redis !== refreshToken) {
            throw {
                code: 401,
                message: '토큰 정보가 올바르지 않습니다.'
            }
        }

        const user = await userRepository.findOneUserByUserId(token.userId);

        if (!user) {
            throw {
                code: 401,
                message: '토큰 정보가 올바르지 않습니다.'
            }
        }

        // freshToken 유효함 -> accessToken, refreshToken 재발급
        const newAccessToken = jwtwebToken.sign({ userId: user.userId }, 'resume@#', { expiresIn: '12h' });
        const newRefreshToken = jwtwebToken.sign({ userId: user.userId }, 'resume&%*', { expiresIn: '7d' });

        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        }
    }
}

const authService = new AuthService();
module.exports = authService