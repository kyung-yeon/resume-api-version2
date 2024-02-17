const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "Resume",
    tableName: "resume",
    columns: {
        resumeId: {
            primary: true,
            type: "int",
            generated: true,
        },
        title: {
            type: "varchar",
        },
        content: {
            type: "varchar",
        },
        userId: {
            type: "int",
        },
        status: {
            type: "varchar",
        },
        createdAt: {
            type: "datetime",
        },
    },
    relations: {
        user: {
            target: "User",
            type: "many-to-one",
            joinTable: true,
            joinColumn: { name: 'userId' },
            cascade: true,
        },
    }
})