import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Meter } from './Meter';
import { Leitura } from './Leitura';

@Table
export class User extends Model {
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
  id!: string;

  @Column({ type: DataType.STRING })
  username!: string;

  @Column({ type: DataType.STRING })
  password!: string;

  @Column({ type: DataType.STRING })
  email!: string;

  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  created_at!: Date;

  @HasMany(() => Leitura)
  leituras!: Leitura[];

  @HasMany(() => Meter)
  meters!: Meter[];
}
