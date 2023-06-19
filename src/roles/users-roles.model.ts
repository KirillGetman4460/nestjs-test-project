import { Column, Model, Table,DataType, BelongsToMany, ForeignKey } from "sequelize-typescript";
import { ApiProperty } from '@nestjs/swagger';
import { User } from "src/users/users.model";
import { Role } from "./roles.model";

@Table({tableName:"users_roles", createdAt:false, updatedAt:false})
export class UserRoles extends Model<UserRoles>{
    
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id:number;
    
    @ForeignKey(() => Role)
    @Column({type: DataType.INTEGER})
    roleId: number;
    
    @ForeignKey(() => User)
    @Column({type: DataType.NUMBER})
    userId: number;

}