import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtUtil {
    constructor( 
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ){}

    async signToken(payload): Promise<string> {
        return await this.jwtService.signAsync(payload, {
            secret: this.configService.get('SECRET_AIRBNB')
        })
    }

    async verifyToken(token: string): Promise<any> {
        return await this.jwtService.verifyAsync(token, {
            secret: this.configService.get('SECRET_AIRBNB')
        })
    }
}