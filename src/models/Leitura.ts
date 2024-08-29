import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Meter } from './Meter';
import { User } from './User';

@Table
export class Leitura extends Model {
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
  id!: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  user_id!: string;

  @ForeignKey(() => Meter)
  @Column({ type: DataType.UUID })
  meter_id!: string;

  @Column({ type: DataType.INTEGER })
  value!: number;

  @Column({ type: DataType.ENUM('WATER', 'GAS') })
  type!: string;

  @Column({ type: DataType.DATE })
  date!: Date;

  @Column({ type: DataType.STRING })
  image_url!: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  confirmed!: boolean;

  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => Meter)
  meter!: Meter;
}
