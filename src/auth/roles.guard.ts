import { Injectable,CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private jwtService: JwtService, 
        private reflector: Reflector
    ){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {   
        try {
            const req = context.switchToHttp().getRequest();
            const roles = this.reflector.getAllAndOverride<string[]>('roles', [
                context.getHandler(),
                context.getClass(),
            ]);

            if(!roles){
                return true
            }

            const authHeader = req.headers.authorization;
            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];            

            if(bearer !== "Bearer" || !token) throw new UnauthorizedException({message:"Пользователь не найден"})

            const user = this.jwtService.verify(token, { secret: process.env.PRIVATE_KEY });
            
            req.user = user;
            return user.roles.some(role => roles.includes(role.value))

        } catch (error) {
            console.log(error);
            
            throw new UnauthorizedException({message:"Пользователь не найден"})
        }     
    }
  }