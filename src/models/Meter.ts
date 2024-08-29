import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { User } from './User';
import { Leitura } from './Leitura';

@Table
export class Meter extends Model {
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
  id!: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  user_id!: string;

  @Column({ type: DataType.ENUM('WATER', 'GAS') })
  type!: string;

  @Column({ type: DataType.STRING })
  location!: string;

  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  created_at!: Date;

  @BelongsTo(() => User)
  user!: User;

  @HasMany(() => Leitura)
  leituras!: Leitura[];
}
