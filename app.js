import express from 'express'
import bodyParser from 'body-parser';

import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

import authRouter from './routers/auth.router.js';
import userRouter from './routers/user.router.js';
import resumeRouter from './routers/resume.router.js';
import { apiTimeCheck } from './middleware/api-time-check.js';

const app = express()
const port = 3000

app.use(apiTimeCheck);
app.use(bodyParser.json());

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/resumes', resumeRouter);

const options = {
    swaggerDefinition: {
        restapi: '3.0.0',
        info: {
            title: 'Resume API',
            version: '1.0.0',
            description: '이력서 API Swagger 문서 입니다.',
        },
    },
    apis: ['./routers/**/*.js'],
}

const specs = swaggerJsdoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})