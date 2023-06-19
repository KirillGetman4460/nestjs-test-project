import { Injectable,HttpException,HttpStatus } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import {User} from "../users/users.model";
import * as bctypt from 'bcryptjs'

@Injectable()
export class AuthService {

    constructor(private userService: UsersService,
        private jwtService: JwtService
    ){}

    private async generateToken(user: User) {
        const payload = {email: user.email, id: user.id, roles: user.roles}
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validate(userDto: CreateUserDto){
        const user = await this.userService.getUserByEmail(userDto.email);
        const passwordEquals = await bctypt.compare(userDto.password, user.password);

        if(user && passwordEquals){
            return user
        }
       
    }

    async login(userDto: CreateUserDto){
        const user = await this.validate(userDto)
        return this.generateToken(user)
    }

    async registration(userDto: CreateUserDto){
        const candidate = await this.userService.getUserByEmail(userDto.email)

        if(candidate){
            throw new HttpException("Пользователь с таким email уже существует", HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bctypt.hash(userDto.password,5)
        const user = await this.userService.createUser({...userDto, password:hashPassword})

        return this.generateToken(user)
    }


    

}
