import { Column, Entity, Index, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Student {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  @Index()
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;
}
