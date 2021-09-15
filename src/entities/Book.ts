import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  CreateDateColumn,
} from 'typeorm'

@Entity()
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ nullable: false })
  title!: string

  @Column({ nullable: true, name: 'author' })
  author!: number

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date

  @CreateDateColumn({ name: 'update_at' })
  updatedAt!: Date
}
