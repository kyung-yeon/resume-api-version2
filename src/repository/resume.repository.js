const { dataSource } = require('../typeorm');

class ResumeRepository {
    selectAllSortedResumes = async (sort) => {

        // 0~5
        const randumNumber = Math.floor(Math.random() * 2);
        console.log('randumNumber', randumNumber);

        // delay
        await new Promise(resolve => {
            setTimeout(() => {
                resolve()
            }, randumNumber * 1000) // ms
        })

        const resumes = await dataSource.getRepository('Resume').find({
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
            order: {
                [sort.orderKey]: sort.orderValue,
            }
        })

        return resumes;
    }

    selectOneResumeByResumeId = async (resumeId) => {
        const resume = await dataSource.getRepository('Resume').findOne({
            where: {
                resumeId: +resumeId,
            },
            select: {
                resumeId: true,
                title: true,
                content: true,
                status: true,
                userId: true,
                user: {
                    select: {
                        name: true,
                    }
                },
                createdAt: true,
            }
        })

        return resume;
    }

    createResume = async (data) => {
        await dataSource.getRepository('Resume').insert(data)
    }

    updateResumeByResumeId = async (resumeId, data) => {
        await dataSource.getRepository('Resume').update({
            resumeId: +resumeId,
        }, data)
    }

    deleteResumeByResumeId = async (resumeId) => {
        await dataSource.getRepository('Resume').delete({
            resumeId: +resumeId,
        })
    }
}

const resumeRepository = new ResumeRepository();
module.exports = resumeRepository;