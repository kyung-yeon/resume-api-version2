require('dotenv').config()
const typeorm = require("typeorm")

const dataSource = new typeorm.DataSource({
    type: "mysql",
    host: process.env.HOST,
    port: process.env.POST,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    synchronize: false,
    entities: [
        require("./entity/user.entity"),
        require("./entity/resume.entity")
    ],
})

dataSource.initialize();

module.exports = {
    dataSource,
}