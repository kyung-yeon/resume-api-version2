const authService = require("../service/auth.service");

class AuthController {
    generateNewAccessTokenByFreshToken = async (req, res) => {
        const { refreshToken } = req.body;

        const token = await authService.verifyFreshToken(refreshToken);
        return res.json(token);
    }
}

const authController = new AuthController();
module.exports = authController;