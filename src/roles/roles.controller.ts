import { Body, Controller, Post,Get, Param  } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
    constructor(private rolesService: RolesService){}
    @Post()
    create(@Body() roleDto:CreateRoleDto ){
        return this.rolesService.create(roleDto)
    }
    @Get("/:value")
    getByValue(@Param("value") value: string){
        return this.rolesService.getRoleByValue(value)
    }
}
