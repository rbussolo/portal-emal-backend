import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUserClient1670211438108 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "user_client",
                columns: [
                    {
                        name: "id",
                        type: "integer",
                        isPrimary: true
                    },
                    {
                        name: "user_id",
                        type: "integer"
                    },
                    {
                        name: "client_id",
                        type: "integer"
                    },
                    {
                        name: "client_name",
                        type: "varchar",
                        precision: 100,
                        isNullable: true
                    },
                    {
                        name: "client_cpf_cnpj",
                        type: "varchar",
                        precision: 20,
                        isNullable: true
                    },
                    {
                        name: "state",
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
                ],
                foreignKeys: [
                    {
                        name: "fk_user_client_user",
                        columnNames: ["user_id"],
                        referencedTableName: "users",
                        referencedColumnNames: ["id"]
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user_client");
    }
}
