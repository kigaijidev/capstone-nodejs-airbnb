import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException, Res, UnauthorizedException } from '@nestjs/common';
import prisma from 'src/configs/prisma.config';
import { ResponseBody } from 'src/common/responseBody';
import { AuthUser } from 'src/common/auth/auth-user';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
    
    async create(authUser: AuthUser, category: CategoryDto): Promise<any> {
        try {
            const { tenLoai, trangThai } = category;
            const userId = authUser.id;
            if(!tenLoai || !trangThai){
                throw new BadRequestException('Missing data required');
            }

            const holderCategory = await prisma.loaiPhong.create({
                data:{
                    ten_loai: tenLoai,
                    trang_thai: trangThai,
                    created_at: new Date()
                }
            });

            return new ResponseBody( HttpStatus.CREATED, holderCategory);
        } catch (err) {
            throw new HttpException(err.message, err.status);
        }
    }

    async getOne(categoryId: number): Promise<any> {
        try {
            const holderCategory = await prisma.loaiPhong.findFirst({
                where:{
                    id: categoryId
                }
            });

            if(!holderCategory){
                throw new NotFoundException('Category not exist.');
            }

            return new ResponseBody( HttpStatus.OK, holderCategory);
        } catch (err) {
            throw new HttpException(err.message, err.status);
        }
    }

    async getAll(): Promise<any> {
        try {
            const categories = await prisma.loaiPhong.findMany();
            return new ResponseBody( HttpStatus.OK, categories)
        } catch (err) {
            throw new HttpException(err.message, err.status);
        }
    }

    async update(authUser: AuthUser, categoryId: number, category: CategoryDto): Promise<any> {
        try {
            const { tenLoai, trangThai } = category;
            const userId = authUser.id;
            
            if(!tenLoai || !trangThai ){
                throw new BadRequestException('Missing data required');
            }

            const categoryExist = await prisma.loaiPhong.findFirst({
                where:{
                    id: categoryId,
                }
            })

            if(!categoryExist){
                throw new NotFoundException();
            }

            const holderCategory = await prisma.loaiPhong.update({
                where:{
                    id: categoryId
                },
                data:{
                    ten_loai: tenLoai,
                    trang_thai: trangThai
                }
            });

            return new ResponseBody( HttpStatus.OK, holderCategory);
        } catch (err) {
            throw new HttpException(err.message, err.status);
        }
    }

    async delete(authUser: AuthUser, categoryId: number): Promise<any> {
        try {
            const userId = authUser.id;
            const holderCateogry = await prisma.loaiPhong.findFirst({
                where:{
                    id: categoryId,
                }
            });

            if(!holderCateogry){
                throw new UnauthorizedException();
            }

            await prisma.loaiPhong.delete({
                where:{
                    id: categoryId,
                }
            })

            return new ResponseBody( HttpStatus.OK, 'Success');
        } catch (err) {
            throw new HttpException(err.message, err.status);
        }
    }
}
