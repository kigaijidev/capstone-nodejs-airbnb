import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { signUpDto } from '../auth/dto/signUp.dto';
import prisma from 'src/configs/prisma.config';
import { AuthUtil } from 'src/utils/auth.util';
import { ResponseBody } from 'src/common/responseBody';
import { PageDto } from 'src/common/dto/page.dto';
import { PaginationBody } from 'src/common/paginationBody';
import { UpdateUserDto } from './dto/update-user.dto';

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

    async getOne(userId: number): Promise<any> {
        try {
            const holderUser = await prisma.nguoiDung.findFirst({
                where:{
                    id: userId
                }
            });

            if(!holderUser){
                throw new NotFoundException('Not Found User.');
            }

            return new ResponseBody( HttpStatus.OK, holderUser);
        } catch (err) {
            throw new HttpException(err.message, err.status);
        }
    }

    async getSearch(name: string): Promise<any> {
        try {
            const holderUser = await prisma.nguoiDung.findMany({
                where:{
                    name: {
                        contains: name
                    }
                },
                select:{
                    id: true,
                    name: true,
                    email: true,
                    phone: true,
                    gender: true,
                    role: true,
                    created_at: true
                }
            });

            return new ResponseBody( HttpStatus.OK, holderUser);
        } catch (err) {
            throw new HttpException(err.message, err.status);
        }
    }

    async getAll(): Promise<any> {
        try {
            const users = await prisma.nguoiDung.findMany();
            return new ResponseBody( HttpStatus.OK, users)
        } catch (err) {
            throw new HttpException(err.message, err.status);
        }
    }

    async getWithPagination(pagination: PageDto): Promise<any> {
        try {
            const { keyword, pageIndex, pageSize} = pagination;
            if(pageIndex <= 0 || pageSize <= 0){
                throw new BadRequestException("pageIndex và pageSize phải lớn hơn 0");
            }
            const totalUsers = await prisma.nguoiDung.count();
            const users = await prisma.nguoiDung.findMany({
                where: {
                    name: {
                        contains: keyword
                    }
                },
                skip: (pageIndex-1)*pageSize,
                take: Number(pageSize)
            });
            return new PaginationBody( HttpStatus.OK, pageIndex, pageSize, totalUsers, keyword, users);
        } catch (err) {
            throw new HttpException(err.message, err.status);
        }
    }

    async update(userId: number, user: UpdateUserDto): Promise<any> {
        try {
            const { name, phone, gender } = user;
            const birthday = new Date(user.birthday);

            const holderUser = await prisma.nguoiDung.update({
                where:{
                    id: userId
                },
                data:{
                    name,
                    phone,
                    birth_day: birthday,
                    gender
                }
            });

            return new ResponseBody( HttpStatus.OK, holderUser);
        } catch (err) {
            throw new HttpException(err.message, err.status);
        }
    }

    async delete(userId: number): Promise<any> {
        try {

            const userExist = await prisma.nguoiDung.findFirst({
                where:{
                    id: userId
                }
            });

            if(!userExist){
                throw new BadRequestException('User not exist.');
            }

            await prisma.nguoiDung.delete({
                where:{
                    id: userId
                }
            })

            return new ResponseBody( HttpStatus.OK, 'Success');
        } catch (err) {
            throw new HttpException(err.message, err.status);
        }
    }

    async uploadImage(userId: number, file: Express.Multer.File): Promise<any> {
        try {
            const userExist = await prisma.nguoiDung.findFirst({
                where:{
                    id: userId
                }
            })

            if(!userExist){
                throw new NotFoundException();
            }

            const image = await prisma.nguoiDung.update({
                where:{
                    id: userId
                },
                data: { 
                   avatar: "/public/images/"+ file.filename
                }
            });

            if(!image){
                throw new BadRequestException();
            }

            return new ResponseBody( HttpStatus.OK, 'Success');
        } catch (err) {
            throw new HttpException(err.message, err.status);
        }
    }
}
