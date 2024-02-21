import authService from '../src/service/auth.service.js';

const jwtValidate = async (req, res, next) => {
    try {
        // 헤더에서 accessToken 가져오기
        const authorization = req.headers.authorization;
        if (!authorization) {
            throw new Error('인증 정보가 올바르지 않습니다.');
        }

        // accessToken 의 인증방식이 올바른가
        // Bearer {jwt}
        const [tokenType, tokenValue] = authorization.split(' ');
        if (tokenType !== 'Bearer') {
            throw new Error('인증 정보가 올바르지 않습니다.');
        }

        if (!tokenValue) {
            throw new Error('인증 정보가 올바르지 않습니다.');
        }

        // 12h 의 유효기간이 남아있는가?
        const user = await authService.verifyAccessToken(tokenValue);

        // user 정보 담기
        res.locals.user = user;

        next();
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: err.message,
        })
    }
}

export default jwtValidate