import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException, Res } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import prisma from 'src/configs/prisma.config';
import { ResponseBody } from 'src/common/responseBody';
import { UpdateLocationDto } from './dto/update-location';
import { AuthUser } from 'src/common/auth/auth-user';
import { PageDto } from 'src/common/dto/page.dto';
import { PaginationBody } from 'src/common/paginationBody';

@Injectable()
export class LocationService {

    async create(location: CreateLocationDto): Promise<any> {
        try {
            const { tenViTri, tinhThanh, quocGia } = location;
            if(!tenViTri || !tinhThanh || !quocGia){
                throw new BadRequestException('Missing data required');
            }
            const holderLocation = await prisma.viTri.create({
                data:{
                    ten_vi_tri: tenViTri,
                    tinh_thanh: tinhThanh,
                    quoc_gia: quocGia
                }
            });

            return new ResponseBody( HttpStatus.CREATED, holderLocation);
        } catch (err) {
            throw new HttpException(err.message, err.status);
        }
    }

    async getOne(locationId: number): Promise<any> {
        try {
            const holderLocation = await prisma.viTri.findFirst({
                where:{
                    id: locationId
                }
            });

            if(!holderLocation){
                throw new NotFoundException('Not Found Location.');
            }

            return new ResponseBody( HttpStatus.OK, holderLocation);
        } catch (err) {
            throw new HttpException(err.message, err.status);
        }
    }

    async getAll(): Promise<any> {
        try {
            const locations = await prisma.viTri.findMany();
            return new ResponseBody( HttpStatus.OK, locations)
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
            const totalLocation = await prisma.viTri.count();
            const locations = await prisma.viTri.findMany({
                where: {
                    ten_vi_tri: {
                        contains: keyword
                    }
                },
                skip: (pageIndex-1)*pageSize,
                take: Number(pageSize)
            });
            return new PaginationBody( HttpStatus.OK, pageIndex, pageSize, totalLocation, keyword, locations);
        } catch (err) {
            throw new HttpException(err.message, err.status);
        }
    }

    async update(locationId: number, location: UpdateLocationDto): Promise<any> {
        try {
            const { tenViTri, tinhThanh, quocGia } = location;
            
            if(!tenViTri || !tinhThanh || !quocGia){
                throw new BadRequestException('Missing data required');
            }

            const locationExist = await prisma.viTri.findFirst({
                where:{
                    id: locationId
                }
            })

            if(!locationExist){
                throw new NotFoundException('Not Found Location.');
            }

            const holderLocation = await prisma.viTri.update({
                where:{
                    id: locationId
                },
                data:{
                    ten_vi_tri: tenViTri,
                    tinh_thanh: tinhThanh,
                    quoc_gia: quocGia
                }
            });

            return new ResponseBody( HttpStatus.OK, holderLocation);
        } catch (err) {
            throw new HttpException(err.message, err.status);
        }
    }

    async delete(locationId: number): Promise<any> {
        try {

            const holderLocation = await prisma.viTri.findFirst({
                where:{
                    id: locationId
                }
            });

            if(!holderLocation){
                throw new NotFoundException('Not Found Location.');
            }

            await prisma.viTri.delete({
                where:{
                    id: locationId
                }
            })

            return new ResponseBody( HttpStatus.OK, 'Success');
        } catch (err) {
            throw new HttpException(err.message, err.status);
        }
    }

    async uploadImage(locationId: number, file: Express.Multer.File): Promise<any> {
        try {
            const locationExist = await prisma.viTri.findFirst({
                where:{
                    id: locationId
                }
            })

            if(!locationExist){
                throw new NotFoundException();
            }

            const image = await prisma.viTri.update({
                where:{
                    id: locationId
                },
                data: { 
                   hinh_anh: "/public/images/"+ file.filename
                }
            });

            if(!image){
                throw new BadRequestException();
            }

            return new ResponseBody( HttpStatus.OK, image);
        } catch (err) {
            throw new HttpException(err.message, err.status);
        }
    }
}
