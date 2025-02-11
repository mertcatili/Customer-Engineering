import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Brand {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;
}