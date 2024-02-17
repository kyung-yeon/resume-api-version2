const resumeService = require('./resume.service');
const resumeRepository = require('../repository/resume.repository');

jest.mock('../repository/resume.repository')

describe('ResumeService', () => {
    describe('모든 이력서 조회', () => {
        it('전체 이력서가 정상 조회된다', async () => {
            resumeRepository.selectAllSortedResumes.mockResolvedValueOnce([{
                resumeId: 1,
            }])

            const sort = {
                orderKey: 'resumeId',
                orderValue: 'desc',
            }
            const result = await resumeService.findAllSortedResumes(sort);

            expect(result).toBeDefined()
            expect(result).toHaveLength(1);
        })
    })

    describe('이력서 단건 조회', () => {
        it('resumeId 를 통해 이력서가 정상 조회된다', async () => {
            resumeRepository.selectOneResumeByResumeId.mockResolvedValueOnce({
                resumeId: 1,
            })

            const result = await resumeService.findOneResumeByResumeId(1);

            expect(result).toHaveProperty('resumeId')
        })
    })

    describe('이력서 생성', () => {
        it('이력서를 정상 생성한다', async () => {
            resumeRepository.createResume.mockResolvedValueOnce(undefined)

            const data = {};
            const result = await resumeService.createResume(data);

            expect(result).not.toBeDefined();
        })
    })

    describe('이력서 수정', () => {
        it('이력서를 정상 생성한다', async () => {
            resumeRepository.selectOneResumeByResumeId.mockResolvedValueOnce({
                resumeId: 1,
                userId: 1,
                title: 'foo',
            })
            resumeRepository.updateResumeByResumeId.mockResolvedValueOnce(undefined);

            const data = {};
            const byUser = {
                grade: 'user',
                userId: 1,
            }
            const result = await resumeService.updateResumeByResumeId(1, data, byUser);

            expect(result).not.toBeDefined();
        })

        it('존재하지 않는 이력서에 대해 수정할 수 없다.', async () => {
            resumeRepository.selectOneResumeByResumeId.mockResolvedValueOnce(undefined)

            const data = {};
            const byUser = {
                grade: 'user',
                userId: 1,
            }
            await expect(resumeService.updateResumeByResumeId(1, data, byUser)).rejects.toMatchObject({
                code: 401,
                message: '존재하지 않는 이력서 입니다.',
            })
        })

        it('본인 이력서가 아니면 수정할 수 없다', async () => {
            resumeRepository.selectOneResumeByResumeId.mockResolvedValueOnce({
                resumeId: 1,
                userId: 1,
                title: 'foo',
            })

            const data = {};
            const byUser = {
                grade: 'user',
                userId: 3,
            }
            await expect(resumeService.updateResumeByResumeId(1, data, byUser)).rejects.toMatchObject({
                code: 401,
                message: '올바르지 않은 요청입니다.',
            })
        })


        it('본인 이력서가 아니더라도 권한이 admin이면 수정이 가능하다', async () => {
            resumeRepository.selectOneResumeByResumeId.mockResolvedValueOnce({
                resumeId: 1,
                userId: 1,
                title: 'foo',
            })

            const data = {};
            const byUser = {
                grade: 'admin',
                userId: 3,
            }
            const result = await resumeService.updateResumeByResumeId(1, data, byUser);
            expect(result).not.toBeDefined();
        })
    })

    describe('이력서 삭제', () => {
        it('이력서가 정상 삭제된다', async () => {
            resumeRepository.selectOneResumeByResumeId.mockResolvedValueOnce({
                resumeId: 1,
                userId: 1,
                title: 'foo',
            })
            resumeRepository.deleteResumeByResumeId.mockResolvedValueOnce(undefined);

            const byUser = {
                grade: 'user',
                userId: 1,
            }
            const result = await resumeService.deleteResumeByResumeId(1, byUser);
            expect(result).not.toBeDefined();
        })

        it('이력서가 없다면 에러가 반환된다', async () => {
            resumeRepository.selectOneResumeByResumeId.mockResolvedValueOnce(undefined)

            const byUser = {
                grade: 'user',
                userId: 1,
            }
            await expect(resumeService.deleteResumeByResumeId(1, byUser)).rejects.toMatchObject({
                code: 400,
                message: '존재하지 않는 이력서 입니다.',
            })
        })

        it('본인 이력서가 아니면 삭제할 수 없다', async () => {
            resumeRepository.selectOneResumeByResumeId.mockResolvedValueOnce({
                resumeId: 1,
                userId: 1,
                title: 'foo',
            })

            const byUser = {
                grade: 'user',
                userId: 3,
            }
            await expect(resumeService.deleteResumeByResumeId(1, byUser)).rejects.toMatchObject({
                code: 400,
                message: '올바르지 않은 요청입니다.',
            })
        })
    });
})