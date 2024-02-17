const axios = require('axios');

const apiTimeCheck = (req, res, next) => {
    const start = new Date()
    next();
    res.on('finish', () => {
        const end = new Date()
        console.log('api end > ', end - start)

        if (end - start >= 3000) {
            // slack
            const requestUrl = req.originalUrl;
            const authorization = req.headers.authorization;
            axios.post('https://hooks.slack.com/services/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', {
                "text": `URL: ${requestUrl}\nTOKEN: ${authorization}\nAPI 가 너무 느려요!! > ${end - start}ms 가 걸렸어요`
            })
        }
    })
}

module.exports = {
    apiTimeCheck,
}