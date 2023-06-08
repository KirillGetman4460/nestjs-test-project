import { Column, Model, Table,DataType } from "sequelize-typescript";
import { ApiProperty } from '@nestjs/swagger';
import {UserCreationAttrs} from "../interfaces/user"

@Table({tableName:"users2"})
export class User extends Model<User,UserCreationAttrs>{
    @ApiProperty({example:'1',description:"Уникальный id пользователя"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id:number;

    @ApiProperty({example:'@test.com',description:"Email пользователя"})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @ApiProperty({example:'12345678',description:"Пароль пользователя"})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @ApiProperty({example:'false',description:"Забанен пользователь или нет"})
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    banned: boolean;

    @ApiProperty({example:'Пример текста',description:"Причина бана"})
    @Column({type: DataType.STRING, allowNull: true})
    banReason: string;
}