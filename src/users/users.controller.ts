import { Body, Controller, Post,Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation,ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import {RolesGuard} from "../auth/roles.guard";
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){}

    @ApiOperation({summary:'Create user'})
    @ApiResponse({status:200, type:User})
    @Post()
    create(@Body() userDto: CreateUserDto){
        return this.usersService.createUser(userDto)
    }

    @ApiOperation({summary:'Get all users'})
    @ApiResponse({status:200, type:[User]})
    @Roles("admin")
    @UseGuards(RolesGuard)
    @Get()
    getAll(){
        return this.usersService.getAllUsers()
    }
}
