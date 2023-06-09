import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto{
    @ApiProperty({example:'@test.com',description:"Email пользователя"})
    readonly email:string;
    @ApiProperty({example:'12345678',description:"Пароль пользователя"})
    readonly password: string;
}