import { CreateDateColumn, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export abstract class BaseEntity{
    @PrimaryColumn({type: 'number', name:'ID_D'})
    id_d: number;

    @CreateDateColumn({type: 'date', name:'CREATE_AT'})
    createAt: Date

    @UpdateDateColumn({type: 'date', name:'UPDATE_AT'})
    updateAt: Date
}

