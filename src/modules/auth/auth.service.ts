import { HttpException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { signUpDto } from './dto/signUp.dto';
import prisma from 'src/configs/prisma.config';
import { signInDto } from './dto/signIn.dto';
import { AuthUtil } from 'src/utils/auth.util';
import { JwtService } from '@nestjs/jwt';
import { JwtUtil } from 'src/utils/jwt.util';

@Injectable()
export class AuthService {
    constructor( 
        private readonly authUtil: AuthUtil,
        private readonly jwtUtil: JwtUtil 
    ){}

    async signIn(signIn: signInDto): Promise<any> {
        try{
            const { email, password } = signIn;

            const holderUser = await prisma.nguoiDung.findFirst({
                where:{
                    email
                }
            });
    
            if(!holderUser){
                throw new NotFoundException('User not found.');
            }
    
            const checkPassword = await this.authUtil.comparePassword(password, holderUser.pass_word);
            if(!checkPassword){
                throw new UnauthorizedException('Invalid password.')
            }
    
            const { pass_word, ...resultUser } = holderUser;
    
            const accessToken = await this.jwtUtil.signToken(resultUser);
    
            return {
                accessToken
            };
        } catch (err){
            throw new HttpException(err.message, err.status)
        }
    }
}
