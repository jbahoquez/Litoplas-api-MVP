import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Permission{
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({nullable:false})
    name: string;

    @Column({nullable:false})
    description: string;

    @Column({nullable:false})
    isActive: boolean;

    @CreateDateColumn()
    createAt: Date

    @UpdateDateColumn()
    updateAt: Date
}