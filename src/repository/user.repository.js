const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class UserRepository {
    findOneUserByUserId = async (userId) => {
        const user = await prisma.user.findFirst({
            where: {
                userId,
            }
        })

        return user;
    }

    selectOneUserbyClientId = async (clientId) => {
        const user = await prisma.user.findFirst({
            where: {
                clientId,
            }
        })

        return user;
    }

    selectOneUserbyEmail = async (email) => {
        const user = await prisma.user.findFirst({
            where: {
                email,
            }
        })

        return user;
    }

    selectOneUserbyEmailAndPassword = async (email, password) => {
        const user = await prisma.user.findFirst({
            where: {
                email,
                password,
            }
        })

        return user;
    }

    createUser = async (data) => {
        await prisma.user.create({
            data
        });
    }

}

const userRepository = new UserRepository();
module.exports = userRepository;