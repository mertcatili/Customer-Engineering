import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Branch {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    brand_id: string;

    @Column()
    name: string;

    @Column()
    full_address: string;

    @Column()
    latitude: string;

    @Column()
    longitude: string;

    @Column()
    location: string;

    @Column()
    phone: string;

    @Column()
    is_active: boolean;

    @Column()
    created_at: Date;
}
