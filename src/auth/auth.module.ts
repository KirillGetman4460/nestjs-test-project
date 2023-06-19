import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';


@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports:[
    JwtModule.register({ 
      secret: process.env.PRIVATE_KEY,
      signOptions:{
        expiresIn:'24h'
      },
      secretOrPrivateKey:'123'
     }),
    UsersModule
  ],
  exports:[AuthService]
})
export class AuthModule {}
