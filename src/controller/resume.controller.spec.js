const resumeContoller = require('./resume.controller');
const resumeService = require('../service/resume.service');

jest.mock('../service/resume.service');

describe('ResumeController', () => {
    describe('모든 이력서 조회', () => {
        it('모든 이력서가 정상 조회된다', async () => {
            const responseData = [{
                resumeId: 1,
            }];
            const request = {
                query: {
                    orderKey: 'resumeId',
                    orderValue: 'desc',
                }
            }
            const response = {
                status: jest.fn(() => response),
                json: jest.fn(() => responseData),
            }

            resumeService.findAllSortedResumes.mockResolvedValueOnce(responseData)

            const result = await resumeContoller.findAllResumes(request, response);
            expect(result).toMatchObject(responseData)
        })
    })

    describe('이력서 단건 조회', () => {
        it('resumeId 를 통해 이력서가 정상 조회된다', async () => {
            const responseData = {
                resumeId: 1,
            };
            const request = {
                params: {
                    resumeId: 1,
                }
            }
            const response = {
                status: jest.fn(() => response),
                json: jest.fn(() => responseData),
            }

            resumeService.findOneResumeByResumeId.mockResolvedValueOnce(responseData)

            const result = await resumeContoller.findOneResume(request, response);
            expect(result).toMatchObject(responseData)
        })
    })

    describe('이력서 생성', () => {
        it('이력서가 정상 생성된다', async () => {
            const request = {
                params: {
                    resumeId: 1,
                },
                body: {
                    title: 'foo',
                    content: 'bar'
                }
            }
            const response = {
                status: jest.fn(() => response),
                json: jest.fn(() => undefined),
                end: jest.fn(),
            }

            resumeService.createResume.mockResolvedValueOnce(undefined)

            const result = await resumeContoller.findOneResume(request, response);
            expect(result).not.toBeDefined();
        })
    })


    describe('이력서 수정', () => {
        it('이력서가 정상 수정된다', async () => {
            const request = {
                params: {
                    resumeId: 1,
                },
                body: {
                    title: 'foo',
                    content: 'bar',
                    status: 'DROP',
                }
            }
            const response = {
                status: jest.fn(() => response),
                json: jest.fn(() => undefined),
                end: jest.fn(),
                locals: {
                    user: {
                        userId: 1,
                    }
                }
            }

            resumeService.updateResumeByResumeId.mockResolvedValueOnce(undefined)

            const result = await resumeContoller.findOneResume(request, response);
            expect(result).not.toBeDefined();
        })

        it('이력서수정할 때에는 정해진 상태값 안에서 선택해야 한다.', async () => {
            const expectJson = {
                success: false,
                message: '올바르지 않은 상태값 입니다.',
            }
            const request = {
                params: {
                    resumeId: 1,
                },
                body: {
                    title: 'foo',
                    content: 'bar',
                    status: 'qaz',
                }
            }
            const response = {
                status: jest.fn(() => response),
                json: jest.fn(() => expectJson),
                end: jest.fn(),
                locals: {
                    user: {
                        userId: 1,
                    }
                }
            }

            resumeService.updateResumeByResumeId.mockResolvedValueOnce(undefined)

            const result = await resumeContoller.findOneResume(request, response);
            expect(result).toMatchObject(expectJson);
        })
    })

    describe('이력서 삭제', () => {
        it('이력서가 정상 삭제된다', async () => {
            const request = {
                params: {
                    resumeId: 1,
                }
            }
            const response = {
                status: jest.fn(() => response),
                json: jest.fn(() => undefined),
                end: jest.fn(),
                locals: {
                    user: {
                        userId: 1,
                    }
                }
            }

            resumeService.deleteResumeByResumeId.mockResolvedValueOnce(undefined)

            const result = await resumeContoller.deleteResume(request, response);
            expect(result).not.toBeDefined();
        })
    })
})