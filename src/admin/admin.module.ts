import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AdminController],
  providers: [AdminService],
  imports:[
    JwtModule.register({ 
      secret: process.env.PRIVATE_KEY,
      signOptions:{
        expiresIn:'24h'
      },
      secretOrPrivateKey:'123'
     }),
    UsersModule
  ]
})
export class AdminModule {}
