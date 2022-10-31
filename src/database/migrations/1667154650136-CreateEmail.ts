import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateEmail1667154650136 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "emails",
                columns: [
                    {
                        name: "id",
                        type: "integer",
                        isPrimary: true
                    },
                    {
                        name: "from",
                        type: "varchar",
                        precision: 100
                    },
                    {
                        name: "to",
                        type: "varchar",
                        precision: 100,
                        isNullable: true
                    },
                    {
                        name: "subject",
                        type: "varchar",
                        precision: 100,
                        isNullable: true
                    },
                    {
                        name: "content",
                        type: "text",
                        isNullable: true
                    },
                    {
                        name: "status",
                        type: "varchar",
                        precision: 10,
                        isNullable: true
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                        isNullable: true
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("emails");
    }
}


