import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import { AuthUtil } from 'src/utils/auth.util';
import { JwtUtil } from 'src/utils/jwt.util';

@Module({
    imports:[
        JwtModule.register({}),
        ConfigModule.forRoot({ isGlobal: true}),
    ],
    controllers: [AuthController],
    providers: [
        AuthService, 
        UsersService, 
        JwtStrategy,
        AuthUtil,
        JwtUtil
    ]
})
export class AuthModule {}
