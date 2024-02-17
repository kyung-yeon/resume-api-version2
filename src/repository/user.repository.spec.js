const { dataSource } = require('../typeorm');
const userRepository = require('./user.repository');

jest.mock('../typeorm')

describe('UserRepository', () => {
    describe('userId 로 사용자를 조회한다.', () => {
        it('사용자가 정상 조회된다.', async () => {
            dataSource.getRepository = (tableName) => ({
                findOne: jest.fn(() => ({
                    userId: 1,
                    name: '홍길동',
                })),
            })

            const result = await userRepository.findOneUserByUserId(1);
            expect(result).toHaveProperty('userId');
            expect(result).toHaveProperty('name');
            expect(result).toBeDefined()
        })
    })

    describe('clientId 로 사용자를 조회한다.', () => {
        it('사용자가 정상 조회된다.', async () => {
            dataSource.getRepository = (tableName) => ({
                findOne: jest.fn(() => ({
                    userId: 1,
                    name: '홍길동',
                })),
            })

            const result = await userRepository.selectOneUserbyClientId('c1');
            expect(result).toHaveProperty('userId');
            expect(result).toHaveProperty('name');
            expect(result).toBeDefined()
        })
    })

    describe('email 로 사용자를 조회한다.', () => {
        it('사용자가 정상 조회된다.', async () => {
            dataSource.getRepository = (tableName) => ({
                findOne: jest.fn(() => ({
                    userId: 1,
                    name: '홍길동',
                })),
            })

            const result = await userRepository.selectOneUserbyEmail('a@b.com');
            expect(result).toHaveProperty('userId');
            expect(result).toHaveProperty('name');
            expect(result).toBeDefined()
        })
    })

    describe('email, password 로 사용자를 조회한다.', () => {
        it('사용자가 정상 조회된다.', async () => {
            dataSource.getRepository = (tableName) => ({
                findOne: jest.fn(() => ({
                    userId: 1,
                    name: '홍길동',
                })),
            })

            const result = await userRepository.selectOneUserbyEmailAndPassword('a@b.com', 'p1');
            expect(result).toHaveProperty('userId');
            expect(result).toHaveProperty('name');
            expect(result).toBeDefined()
        })
    })


    describe('사용자 생성.', () => {
        it('사용자 데이터가 정상 생성된다.', async () => {
            dataSource.getRepository = (tableName) => ({
                insert: jest.fn(() => ({
                    identifiers: 1,
                })),
            })

            const result = await userRepository.createUser({
                name: 'bar',
            });
            expect(result).not.toBeDefined()
        })
    })
})