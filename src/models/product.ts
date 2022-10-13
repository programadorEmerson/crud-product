import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class Product extends Model<Product> {
  @Column({
    type: DataType.STRING(250),
    allowNull: false,
  })
  public name: string;

  @Column({
    type: DataType.STRING(550),
    allowNull: false,
  })
  public description: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  public price: number;

  @Column({
    type: DataType.STRING(250),
    allowNull: false,
  })
  public image: string;

  @Column({
    type: DataType.FLOAT(10, 2),
    allowNull: false,
  })
  public stock: number;

  @Column({
    type: DataType.BOOLEAN(),
    allowNull: false,
  })
  public active: boolean;
}
