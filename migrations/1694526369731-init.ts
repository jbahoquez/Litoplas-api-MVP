import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1694526369731 implements MigrationInterface {
    name = 'Init1694526369731'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" number NOT NULL, "create_at" date DEFAULT CURRENT_TIMESTAMP NOT NULL, "update_at" date DEFAULT CURRENT_TIMESTAMP NOT NULL, "name" varchar2(200) NOT NULL, "email" varchar2(150) NOT NULL, "phone" varchar2(100) NOT NULL, "role" number NOT NULL, "password" varchar2(100), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "permission" ("id" number NOT NULL, "create_at" date DEFAULT CURRENT_TIMESTAMP NOT NULL, "update_at" date DEFAULT CURRENT_TIMESTAMP NOT NULL, "name" varchar2(100) NOT NULL, "description" varchar2(100) NOT NULL, "is_active" number NOT NULL, CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_permission" ("id" number NOT NULL, "create_at" date DEFAULT CURRENT_TIMESTAMP NOT NULL, "update_at" date DEFAULT CURRENT_TIMESTAMP NOT NULL, "access_level" varchar2(255) NOT NULL, "user_id" number, "permission_id" number, CONSTRAINT "PK_a7326749e773c740a7104634a77" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_permission" ADD CONSTRAINT "FK_2305dfa7330dd7f8e211f4f35d9" FOREIGN KEY ("user_id") REFERENCES "user" ("id")`);
        await queryRunner.query(`ALTER TABLE "user_permission" ADD CONSTRAINT "FK_8a4d5521c1ced158c13438df3df" FOREIGN KEY ("permission_id") REFERENCES "permission" ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_permission" DROP CONSTRAINT "FK_8a4d5521c1ced158c13438df3df"`);
        await queryRunner.query(`ALTER TABLE "user_permission" DROP CONSTRAINT "FK_2305dfa7330dd7f8e211f4f35d9"`);
        await queryRunner.query(`DROP TABLE "user_permission"`);
        await queryRunner.query(`DROP TABLE "permission"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
