import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUser1667049880132 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "integer",
                        isPrimary: true
                    },
                    {
                        name: "email",
                        type: "varchar",
                        isUnique: true,
                        precision: 100
                    },
                    {
                        name: "password",
                        type: "varchar",
                        precision: 255,
                        isNullable: true
                    },
                    {
                        name: "name",
                        type: "varchar",
                        precision: 100,
                        isNullable: true
                    },
                    {
                        name: "cpf_cnpj",
                        type: "varchar",
                        precision: 14,
                        isNullable: true
                    },
                    {
                        name: "cellphone",
                        type: "varchar",
                        precision: 20,
                        isNullable: true
                    },
                    {
                        name: "type",
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
        await queryRunner.dropTable("users");
    }
}
