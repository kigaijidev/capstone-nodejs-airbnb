import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { signUpDto } from '../auth/dto/signUp.dto';
import prisma from 'src/configs/prisma.config';
import { AuthUtil } from 'src/utils/auth.util';
import { ResponseBody } from 'src/common/responseBody';
import { PageDto } from 'src/common/dto/page.dto';
import { PaginationBody } from 'src/common/paginationBody';
import { RoomDto } from './dto/room.dto';
import { AuthUser } from 'src/common/auth/auth-user';

@Injectable()
export class RoomService {

    async create(authUser: AuthUser, room: RoomDto): Promise<any> {
        try {
            const userId = authUser.id;
            const { 
                tenPhong, khach, phongNgu, giuong, phongTam, moTa, giaTien, mayGiat, 
                banLa, tivi, dieuHoa, wifi, bep, doXe, hoBoi, banUi, maViTri 
            } = room;

            const holderRoom = await prisma.phong.create({
                data:{
                    chu_phong: userId,
                    ten_phong: tenPhong,
                    khach,
                    phong_ngu: phongNgu,
                    giuong,
                    phong_tam: phongTam,
                    mo_ta: moTa,
                    gia_tien: giaTien,
                    may_giat: mayGiat,
                    ban_la: banLa,
                    tivi,
                    dieu_hoa: dieuHoa,
                    wifi,
                    bep,
                    do_xe: doXe,
                    ho_boi: hoBoi,
                    ban_ui: banUi,
                    ma_vi_tri: maViTri,
                    created_at: new Date(),
                }
            });
            return new ResponseBody(HttpStatus.CREATED, holderRoom);
        } catch (err) {
            throw new HttpException(err.message, err.status);
        }
    }

    async getOne(roomId: number): Promise<any> {
        try {
            const holderRoom = await prisma.phong.findFirst({
                where:{
                    id: roomId
                }
            });

            if(!holderRoom){
                throw new NotFoundException('Room not exist.');
            }

            return new ResponseBody( HttpStatus.OK, holderRoom);
        } catch (err) {
            throw new HttpException(err.message, err.status);
        }
    }

    async getByLocation(locationId: number): Promise<any> {
        try {
            const holderRooms = await prisma.phong.findMany({
                where:{
                    ma_vi_tri: locationId
                }
            });

            return new ResponseBody( HttpStatus.OK, holderRooms);
        } catch (err) {
            throw new HttpException(err.message, err.status);
        }
    }

    async getByCategory(categoryId: number): Promise<any> {
        try {
            const holderRooms = await prisma.phong.findMany({
                where:{
                    loai_phong: categoryId
                }
            });

            return new ResponseBody( HttpStatus.OK, holderRooms);
        } catch (err) {
            throw new HttpException(err.message, err.status);
        }
    }

    async getAll(): Promise<any> {
        try {
            const rooms = await prisma.phong.findMany();
            return new ResponseBody( HttpStatus.OK, rooms)
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
            const totalRooms = await prisma.phong.count();
            const rooms = await prisma.phong.findMany({
                where: {
                    ten_phong: {
                        contains: keyword
                    }
                },
                skip: (pageIndex-1)*pageSize,
                take: Number(pageSize)
            });
            return new PaginationBody( HttpStatus.OK, pageIndex, pageSize, totalRooms, keyword, rooms);
        } catch (err) {
            throw new HttpException(err.message, err.status);
        }
    }

    async update(authUser: AuthUser, roomId: number, room: RoomDto): Promise<any> {
        try {
            const userId = authUser.id;
            const { 
                tenPhong, khach, phongNgu, giuong, phongTam, moTa, giaTien, mayGiat, 
                banLa, tivi, dieuHoa, wifi, bep, doXe, hoBoi, banUi, maViTri 
            } = room;

            const roomExist = await prisma.phong.findFirst({
                where:{
                    id: roomId,
                    chu_phong: userId
                }
            })

            if(!roomExist){
                throw new UnauthorizedException();
            }

            const holderRoom = await prisma.phong.update({
                where:{
                    id: roomId,
                    chu_phong: userId
                },
                data:{
                    ten_phong: tenPhong,
                    khach,
                    phong_ngu: phongNgu,
                    giuong,
                    phong_tam: phongTam,
                    mo_ta: moTa,
                    gia_tien: giaTien,
                    may_giat: mayGiat,
                    ban_la: banLa,
                    tivi,
                    dieu_hoa: dieuHoa,
                    wifi,
                    bep,
                    do_xe: doXe,
                    ho_boi: hoBoi,
                    ban_ui: banUi,
                    ma_vi_tri: maViTri,
                }
            });
            return new ResponseBody(HttpStatus.OK, holderRoom);
        } catch (err) {
            throw new HttpException(err.message, err.status);
        }
    }

    async delete(authUser: AuthUser, roomId: number): Promise<any> {
        try {

            const userId = authUser.id;
            const userExist = await prisma.phong.findFirst({
                where:{
                    id: roomId,
                    chu_phong: userId,
                }
            });

            if(!userExist){
                throw new UnauthorizedException();
            }

            await prisma.phong.delete({
                where:{
                    id: roomId,
                    chu_phong: userId,
                }
            })

            return new ResponseBody( HttpStatus.OK, 'Success');
        } catch (err) {
            throw new HttpException(err.message, err.status);
        }
    }

    async uploadImage(authUser: AuthUser, roomId: number, file: Express.Multer.File): Promise<any> {
        try {
            const userId = authUser.id;
            const userExist = await prisma.phong.findFirst({
                where:{
                    id: roomId,
                    chu_phong: userId
                }
            })

            if(!userExist){
                throw new UnauthorizedException();
            }

            const image = await prisma.phong.update({
                where:{
                    id: roomId,
                    chu_phong: userId
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
