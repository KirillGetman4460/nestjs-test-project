import { Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepository: typeof User,
        private roleRepository: RolesService
    ){}

    async createUser(dto:CreateUserDto){
        const user = await this.userRepository.create(dto)
        const role = await this.roleRepository.getRoleByValue('user')
        await user.$set("roles", [role.id])
        return user
    }

    async getAllUsers(){
        const users = await this.userRepository.findAll({include:{all: true}})

        return users
    }
    async getUserByEmail(email: string){
        const user = await this.userRepository.findOne({where:{email},include:{all: true}})
        return user
    }
}
