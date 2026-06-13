import {
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    OneToMany,
    ManyToMany,
    JoinTable,
    OneToOne,
} from 'typeorm';
import { MovieEntity } from './movie.entity';

@Entity({ name: 'movie_posters' })
export class MoviePosterEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 255,
    })
    url: string;

    @OneToOne(() => MovieEntity, (movie) => movie.poster)
    movie: MovieEntity;

    @CreateDateColumn({
        name: 'created_at',
    })
    createdAt: Date;
}
