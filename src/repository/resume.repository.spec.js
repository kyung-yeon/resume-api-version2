const { dataSource } = require('../typeorm');
const resumeRepository = require('./resume.repository');

jest.mock('../typeorm')

describe('ResumeRepository', () => {
    describe('이력서 전체 조회', () => {
        it('정렬된 전체 이력서 조회', async () => {
            dataSource.initialize = jest.fn();
            dataSource.getRepository = (tableName) => ({
                find: jest.fn(() => [{
                    resumeId: 1,
                    title: '이력서 제목',
                    content: '자기소개',
                    status: 'APPLY',
                    user: {
                        name: '홍길동'
                    },
                    createdAt: new Date().toISOString()
                }]),
            })

            const sort = {
                orderKey: 'resumeId',
                orderValue: 'desc',
            };
            const result = await resumeRepository.selectAllSortedResumes(sort);
            expect(typeof result).toBe('object')
            expect(result).toHaveLength(1)
            expect(result).toBeDefined()
        })

        it('데이터가 없다면 빈 배열리 반환된다', async () => {
            dataSource.initialize = jest.fn();
            dataSource.getRepository = (tableName) => ({
                find: jest.fn(() => ([])),
            })

            const sort = {
                orderKey: 'resumeId',
                orderValue: 'desc',
            };
            const result = await resumeRepository.selectAllSortedResumes(sort);
            expect(typeof result).toBe('object')
            expect(result).toHaveLength(0)
            expect(result).toBeDefined()
        })
    })

    describe('이력서 단건 조회', () => {
        it('이력서가 정상 조회 된다', async () => {
            dataSource.initialize = jest.fn();
            dataSource.getRepository = (tableName) => ({
                findOne: jest.fn(() => ({
                    resumeId: 1,
                    title: 'foo',
                    content: 'bar',
                    status: 'APPLY',
                    userId: 1,
                    user: {
                        name: '홍길동'
                    },
                    createdAt: '2024-11-11T11:12:13Z',
                })),
            })

            const result = await resumeRepository.selectOneResumeByResumeId(1);
            expect(typeof result).toBe('object')
            expect(result).toBeDefined()
            expect(result).toMatchObject({
                resumeId: 1,
                title: 'foo',
                content: 'bar',
                status: 'APPLY',
                userId: 1,
                user: {
                    name: '홍길동'
                },
                createdAt: '2024-11-11T11:12:13Z',
            })
        })

        it('조회된 데이터가 없는 경우 undefined 를 반환한다.', async () => {
            dataSource.initialize = jest.fn();
            dataSource.getRepository = (tableName) => ({
                findOne: jest.fn(() => undefined),
            })

            const result = await resumeRepository.selectOneResumeByResumeId(1);
            expect(result).not.toBeDefined()
        })
    })

    describe('이력서 생성', () => {
        it('이력서가 정상 생성된다', async () => {
            dataSource.initialize = jest.fn();
            dataSource.getRepository = (tableName) => ({
                insert: jest.fn(() => ({
                    insertId: 1,
                })),
            })

            const data = {
                title: 'foo',
                content: 'bar'
            }
            const result = await resumeRepository.createResume(data);
            expect(result).not.toBeDefined();
        })
    })

    describe('이력서 수정', () => {
        it('이력서가 정상 수정된다', async () => {
            dataSource.initialize = jest.fn();
            dataSource.getRepository = (tableName) => ({
                update: jest.fn(() => ({
                    affected: 1,
                })),
            })

            const data = {
                title: 'foo',
                content: 'bar'
            }
            const result = await resumeRepository.updateResumeByResumeId(1, data);
            expect(result).not.toBeDefined();
        })
    })

    describe('이력서 삭제', () => {
        it('이력서가 정상 삭제된다', async () => {
            dataSource.initialize = jest.fn();
            dataSource.getRepository = (tableName) => ({
                delete: jest.fn(() => ({
                    affected: 1,
                })),
            })

            const result = await resumeRepository.deleteResumeByResumeId(1);
            expect(result).not.toBeDefined();
        })
    })
})