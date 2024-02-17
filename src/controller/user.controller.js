const userService = require('../service/user.service');

class UserController {
    userSignUp = async (req, res) => {
        const { email, clientId, password, passwordConfirm, name, grade } = req.body;
        if (grade && !['user', 'admin'].includes(grade)) {
            return res.status(400).json({ success: false, message: '등급이 올바르지 않습니다.' })
        }

        if (!clientId) {
            if (!email) {
                return res.status(400).json({ success: false, message: '이메일은 필수값입니다.' })
            }

            if (!password) {
                return res.status(400).json({ success: false, message: '비밀번호는 필수값입니다.' })
            }

            if (!passwordConfirm) {
                return res.status(400).json({ success: false, message: '비밀번호 확인은 필수값입니다.' })
            }

            if (password.length < 6) {
                return res.status(400).json({ success: false, message: '비밀번호는 최소 6자 이상입니다.' })
            }

            if (password !== passwordConfirm) {
                return res.status(400).json({ success: false, message: '비밀번호와 비밀번호 확인값이 일치하지 않습니다.' })
            }
        }

        if (!name) {
            return res.status(400).json({ success: false, message: '이름은 필수값입니다.' })
        }

        await userService.userSignUp({ email, clientId, password, name, grade });

        return res.status(201).json({
            email,
            name,
        })
    }

    userSignIn = async (req, res) => {
        const { clientId, email, password } = req.body;

        const token = await userService.userSignIn({ clientId, email, password });
        return res.json(token);
    }

    getMyInfo = (req, res) => {
        const user = res.locals.user;

        return res.json({
            email: user.email,
            name: user.name,
        })
    }
}

const userController = new UserController();
module.exports = userController;