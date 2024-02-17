const resumeRepository = require("../repository/resume.repository");

class ResumeService {
    findAllSortedResumes = async (sort) => {
        const resumes = await resumeRepository.selectAllSortedResumes(sort);
        return resumes;
    }

    findOneResumeByResumeId = async (resumeId) => {
        const resume = await resumeRepository.selectOneResumeByResumeId(resumeId);
        return resume;
    }

    createResume = async ({
        title, content, userId,
    }) => {
        await resumeRepository.createResume({
            title,
            content,
            status: 'APPLY',
            userId,
        });
    }

    updateResumeByResumeId = async (resumeId, data, byUser) => {
        const resume = await resumeRepository.selectOneResumeByResumeId(resumeId);
        if (!resume) {
            throw {
                code: 401,
                message: '존재하지 않는 이력서 입니다.',
            }
        }

        if (byUser.grade === 'user' && resume.userId !== byUser.userId) {
            throw {
                code: 401,
                message: '올바르지 않은 요청입니다.',
            };
        }

        // 내가 작성한 이력서이거나 권한 등급이 admin이다.
        await resumeRepository.updateResumeByResumeId(resumeId, data)
    }

    deleteResumeByResumeId = async (resumeId, byUser) => {
        const resume = await resumeRepository.selectOneResumeByResumeId(resumeId);

        if (!resume) {
            throw {
                code: 400,
                message: '존재하지 않는 이력서 입니다.',
            };
        }

        if (resume.userId !== byUser.userId) {
            throw {
                code: 400,
                message: '올바르지 않은 요청입니다.',
            }
        }

        await resumeRepository.deleteResumeByResumeId(resumeId);
    }
}

const resumeService = new ResumeService();
module.exports = resumeService;