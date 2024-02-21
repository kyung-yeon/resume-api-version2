import { dataSource } from '../typeorm/index.js';

class UserRepository {
    findOneUserByUserId = async (userId) => {
        const user = await dataSource.getRepository('User').findOne({
            where: {
                userId,
            }
        })

        return user;
    }

    selectOneUserbyClientId = async (clientId) => {
        const user = await dataSource.getRepository('User').findOne({
            where: {
                clientId,
            }
        })

        return user;
    }

    selectOneUserbyEmail = async (email) => {
        const user = await dataSource.getRepository('User').findOne({
            where: {
                email,
            }
        })

        return user;
    }

    selectOneUserbyEmailAndPassword = async (email, password) => {
        const user = await dataSource.getRepository('User').findOne({
            where: {
                email,
                password,
            }
        })

        return user;
    }

    createUser = async (data) => {
        await dataSource.getRepository('User').insert(data);
    }

}

const userRepository = new UserRepository();
export default userRepository;