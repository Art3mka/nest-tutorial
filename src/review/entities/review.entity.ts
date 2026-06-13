import { MovieEntity } from 'src/movie/entities/movie.entity';
import {
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

@Entity({ name: 'reviews' })
export class ReviewEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'text',
    })
    comment: string;

    @Column({
        type: 'decimal',
        precision: 3,
        scale: 1,
        default: 0.0,
    })
    rating: number;

    @Column({
        name: 'movie_id',
        type: 'int',
    })
    movieId: number;

    @ManyToOne(() => MovieEntity, (movie) => movie.reviews, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'movie_id' })
    movie: MovieEntity;

    @CreateDateColumn({
        name: 'created_at',
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at',
    })
    updatedAt: Date;
}
