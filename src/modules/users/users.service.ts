import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { signUpDto } from '../auth/dto/signUp.dto';
import prisma from 'src/configs/prisma.config';
import { AuthUtil } from 'src/utils/auth.util';

@Injectable()
export class UsersService {
    constructor( private readonly authUtil: AuthUtil ){}

    async create(signUp: signUpDto): Promise<any> {
        try {
            const { name, email, phone, password, gender, role } = signUp;
            const birthday = new Date(signUp.birthday);
            if(!name || !email || !password){
                throw new BadRequestException('Missing data required');
              }
            const hashPassword = await this.authUtil.hashPassword(password);
            const user = await prisma.nguoiDung.create({
                data:{
                    name,
                    email,
                    phone,
                    birth_day: birthday,
                    gender,
                    role,
                    pass_word: hashPassword
                }
            });
            return 'Success';
        } catch (err) {
            throw new HttpException(err.message, err.status);
        }
        
    }
}
