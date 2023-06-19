import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
    constructor(private userService: UsersService,
        private jwtService: JwtService
    ){}

    async getAllUsers(authHeader:string){
        const token = authHeader.split(' ')[1];
        
        const decodedToken = this.jwtService.verify(token, { secret: process.env.PRIVATE_KEY });

        const user = await this.userService.getUserByEmail(decodedToken.email);

        const hasUserRole = user.roles.some(role => role.value === "user");

        if(hasUserRole){
            return this.userService.getAllUsers()
        }
        return null
    }
    async banUser(userDto: CreateUserDto){

    }
}
