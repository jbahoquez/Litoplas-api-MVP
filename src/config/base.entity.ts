import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export abstract class BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id: number;

    @CreateDateColumn()
    createAt: Date

    @UpdateDateColumn()
    updateAt: Date
}

