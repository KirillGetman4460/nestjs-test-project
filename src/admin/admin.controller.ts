import { Controller, Get, Post,Headers } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
    constructor(private adminService:AdminService){}

    @Get('/users')
    getAllUsers(@Headers('Authorization') authHeader: string){
        return this.adminService.getAllUsers(authHeader)
    }

    @Post('/ban_user')
    banUser(){

    }
}
