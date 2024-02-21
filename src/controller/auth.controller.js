import authService from "../service/auth.service.js";

class AuthController {
    generateNewAccessTokenByFreshToken = async (req, res) => {
        try {
            const { refreshToken } = req.body;

            const token = await authService.verifyFreshToken(refreshToken);
            return res.json(token);
        } catch (err) {
            return res.status(err.code).json(err)
        }
    }
}

const authController = new AuthController();
export default authController;