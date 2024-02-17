const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class ResumeRepository {
    selectAllSortedResumes = async (sort) => {
        const resumes = await prisma.resume.findMany({
            select: {
                resumeId: true,
                title: true,
                content: true,
                status: true,
                user: {
                    select: {
                        name: true,
                    }
                },
                createdAt: true,
            },
            orderBy: [
                {
                    [sort.orderKey]: sort.orderValue,
                }
            ]
        })

        return resumes;
    }

    selectOneResumeByResumeId = async (resumeId) => {
        const resume = await prisma.resume.findFirst({
            where: {
                resumeId: +resumeId,
            },
            select: {
                resumeId: true,
                title: true,
                content: true,
                status: true,
                user: {
                    select: {
                        name: true,
                    }
                },
                createdAt: true,
            },
        })

        return resume;
    }

    createResume = async (data) => {
        await prisma.resume.create({
            data,
        })
    }

    updateResumeByResumeId = async (resumeId, data) => {
        await prisma.resume.update({
            where: {
                resumeId: +resumeId,
            },
            data,
        })
    }

    deleteResumeByResumeId = async (resumeId) => {
        await prisma.resume.delete({
            where: {
                resumeId: +resumeId,
            },
        })
    }
}

const resumeRepository = new ResumeRepository();
module.exports = resumeRepository;