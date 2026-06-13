import { ActorEntity } from 'src/actor/entities/actor.entity';
import { ReviewEntity } from 'src/review/entities/review.entity';
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
    JoinColumn,
} from 'typeorm';
import { MoviePosterEntity } from './poster.entity';

export enum Genre {
    ACTION = 'action',
    ADVENTURE = 'adventure',
    COMEDY = 'comedy',
    DRAMA = 'drama',
    FANTASY = 'fantasy',
    HORROR = 'horror',
    MYSTERY = 'mystery',
}

@Entity({ name: 'movies' })
export class MovieEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 255,
    })
    title: string;

    @Column({
        type: 'text',
        nullable: true,
    })
    description: string;

    @Column({
        name: 'release_year',
        type: 'int',
        unsigned: true,
    })
    releaseYear: number;

    @Column({
        type: 'decimal',
        precision: 3,
        scale: 1,
        default: 0.0,
    })
    rating: number;

    @Column({
        name: 'is_available',
        type: 'boolean',
        default: false,
    })
    isAvailable: boolean;

    @Column({
        type: 'enum',
        enum: Genre,
        default: Genre.ACTION,
    })
    genre: Genre;

    @Column({
        name: 'poster_id',
        type: 'int',
        nullable: true,
    })
    posterId: number;

    @OneToOne(() => MoviePosterEntity, (poster) => poster.movie, {
        onDelete: 'CASCADE',
        nullable: true,
    })
    @JoinColumn({ name: 'poster_id' })
    poster: MoviePosterEntity | null;

    @OneToMany(() => ReviewEntity, (review) => review.movie)
    reviews: ReviewEntity[];

    @ManyToMany(() => ActorEntity, (actor) => actor.movies)
    @JoinTable({
        name: 'movie_actors',
        joinColumn: {
            name: 'movie_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'actor_id',
            referencedColumnName: 'id',
        },
    })
    actors: ActorEntity[];

    @CreateDateColumn({
        name: 'created_at',
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at',
    })
    updatedAt: Date;
}
