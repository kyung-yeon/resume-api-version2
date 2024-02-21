import { EntitySchema } from "typeorm";

export default new EntitySchema({
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