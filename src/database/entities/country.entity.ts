import { Table, Model, Column, DataType, Default, PrimaryKey, AllowNull } from 'sequelize-typescript';
import { date as dateHelper } from '@helpers';
import { ICountryCSV } from '@models/interfaces';

@Table({
    tableName: 'Country',
    createdAt: 'createdAt',
    updatedAt: false,
    deletedAt: false
})
export class Country extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string;

    @AllowNull(false)
    @Column(DataType.ENUM('country', 'state'))
    type: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    code: string;

    @AllowNull(false)
    @Column(DataType.INTEGER)
    order: number;

    @AllowNull(false)
    @Column(DataType.BOOLEAN)
    active: boolean;

    @AllowNull(false)
    @Column(DataType.JSONB)
    content: ICountryCSV;

    @AllowNull(false)
    @Column(DataType.INTEGER)
    version: number;

    @Default(() => dateHelper.nowDateWithToDate())
    @Column(DataType.DATE)
    createdAt: Date;
}
