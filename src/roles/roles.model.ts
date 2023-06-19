import { Column, Model, Table,DataType, BelongsToMany } from "sequelize-typescript";
import { ApiProperty } from '@nestjs/swagger';
import { UserRoles } from "./users-roles.model";
import {RoleCreationAttrs} from "../interfaces/role"
import { User } from "src/users/users.model";

@Table({tableName:"roles"})
export class Role extends Model<Role,RoleCreationAttrs>{
    
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id:number;
    
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    value: string;
    
    @Column({type: DataType.STRING, allowNull: false})
    description: string;

    @BelongsToMany(() => User, () => UserRoles)
    users:User[]
}