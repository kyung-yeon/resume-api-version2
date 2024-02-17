const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "User",
    tableName: "user",
    columns: {
        userId: {
            primary: true,
            type: "int",
            generated: true,
        },
        clientId: {
            type: "varchar",
        },
        email: {
            type: "varchar",
        },
        password: {
            type: "varchar",
        },
        grade: {
            type: "varchar",
        },
        name: {
            type: "varchar",
        },
        createdAt: {
            type: "datetime",
        },
    },
})