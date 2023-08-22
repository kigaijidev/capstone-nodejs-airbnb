import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable, NotFoundException, Res, UnauthorizedException } from '@nestjs/common';
import prisma from 'src/configs/prisma.config';
import { ResponseBody } from 'src/common/responseBody';
import { AuthUser } from 'src/common/auth/auth-user';
import { BookingDto } from './dto/booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingService {
    
    async create(authUser: AuthUser, booking: BookingDto): Promise<any> {
        try {
            const { maPhong, ngayDen, ngayDi, soLuongKhach } = booking;
            const userId = authUser.id;
            const dateNow = Date.now();
            const ngayDenNumber = new Date(ngayDen).getTime();
            const ngayDiNumber = new Date(ngayDi).getTime();

            console.log({
                ngayDen: ngayDenNumber,
                ngayDi: ngayDiNumber,
                dateNow: dateNow
            })
            if((ngayDenNumber < dateNow) || (ngayDiNumber < dateNow) || (ngayDenNumber > ngayDiNumber)){
                throw new BadRequestException('Require CheckIn greater CheckOut')
            }

            const roomExist = await prisma.phong.findFirst({
                where:{
                    id: maPhong
                }
            })

            if(!roomExist){
                throw new NotFoundException('Room not exist')
            }
            
            const conflictingBookings = await prisma.datPhong.findMany({
                where: {
                    ma_phong: maPhong,
                    OR: [
                        { 
                            AND: [
                                { ngay_den: { gte: new Date(ngayDen) } }, // Ngày đến của đặt phòng khác phải lớn hơn hoặc bằng ngày đến của đặt phòng mới
                                { ngay_di: { lte: new Date(ngayDi) } }, // Ngày đi của đặt phòng khác phải nhỏ hơn hoặc bằng ngày đi của đặt phòng mới
                            ],
                        },
                        { 
                            AND: [
                                { ngay_den: { lte: new Date(ngayDi) } }, // Ngày đến của đặt phòng khác phải nhỏ hơn hoặc bằng ngày đi của đặt phòng mới
                                { ngay_di: { gte: new Date(ngayDen) } }, // Ngày đi của đặt phòng khác phải lớn hơn hoặc bằng ngày đến của đặt phòng mới
                            ],
                        },
                    ],
                },
            });
        
            if (conflictingBookings.length > 0) {
                throw new ConflictException('Booking conflict date.');
            }

            if(soLuongKhach > roomExist.khach){
                throw new BadRequestException("Booking error: Number of guests exceeds the room's capacity.")
            }

            return new ResponseBody( HttpStatus.CREATED, await prisma.datPhong.create({
                data:{
                    ma_phong: maPhong,
                    ma_nguoi_dat: userId,
                    ngay_den: new Date(ngayDen),
                    ngay_di: new Date(ngayDi),
                    so_luong_khach: soLuongKhach,
                    created_at: new Date()
                }
            }));
        } catch (err) {
            throw new HttpException(err.message, err.status);
        }
    }

    async getByUser(authUser: AuthUser): Promise<any> {
        try {
            const userId = authUser.id;
            const bookings = await prisma.datPhong.findMany({
                where:{
                    ma_nguoi_dat: userId
                }
            });

            return new ResponseBody( HttpStatus.OK, bookings);
        } catch (err) {
            throw new HttpException(err.message, err.status);
        }
    }

    async getOne(bookingId: number): Promise<any> {
        try {
            const holderBooking = await prisma.datPhong.findMany({
                where:{
                    id: bookingId
                },
                include:{
                    NguoiDung:{
                        select:{
                            name: true,
                            email: true,
                            phone: true,
                            avatar: true
                        }
                    }
                }
            });

            if(!holderBooking){
                throw new NotFoundException('Booking not exist.');
            }

            return new ResponseBody( HttpStatus.OK, holderBooking);
        } catch (err) {
            throw new HttpException(err.message, err.status);
        }
    }

    async getAll(): Promise<any> {
        try {
            const bookings = await prisma.datPhong.findMany();
            return new ResponseBody( HttpStatus.OK, bookings)
        } catch (err) {
            throw new HttpException(err.message, err.status);
        }
    }

    async update(authUser: AuthUser, bookingId: number, booking: UpdateBookingDto): Promise<any> {
        try {
            const { ngayDen, ngayDi, soLuongKhach } = booking;
            const userId = authUser.id;

            const dateNow = Date.now();
            const ngayDenNumber = new Date(ngayDen).getTime();
            const ngayDiNumber = new Date(ngayDi).getTime();

            if((ngayDenNumber < dateNow) || (ngayDiNumber < dateNow) || (ngayDenNumber > ngayDiNumber)){
                throw new BadRequestException('Require CheckIn greater CheckOut')
            }
            
            const bookingExist = await prisma.datPhong.findFirst({
                where:{
                    id: bookingId,
                    ma_nguoi_dat: userId
                },
                include: {
                    Phong: {
                        select:{
                            khach: true,
                        }
                    }
                }
            })

            if(!bookingExist){
                throw new UnauthorizedException();
            }

            const conflictingBookings = await prisma.datPhong.findMany({
                where: {
                    ma_phong: bookingExist.ma_phong,
                    NOT: {
                        id: bookingId,
                    },
                    OR: [
                        { 
                            AND: [
                                { ngay_den: { gte: new Date(ngayDen) } }, // Ngày đến của đặt phòng khác phải lớn hơn hoặc bằng ngày đến của đặt phòng mới
                                { ngay_di: { lte: new Date(ngayDi) } }, // Ngày đi của đặt phòng khác phải nhỏ hơn hoặc bằng ngày đi của đặt phòng mới
                            ],
                        },
                        { 
                            AND: [
                                { ngay_den: { lte: new Date(ngayDi) } }, // Ngày đến của đặt phòng khác phải nhỏ hơn hoặc bằng ngày đi của đặt phòng mới
                                { ngay_di: { gte: new Date(ngayDen) } }, // Ngày đi của đặt phòng khác phải lớn hơn hoặc bằng ngày đến của đặt phòng mới
                            ],
                        },
                    ],
                },
            });
        
            if (conflictingBookings.length > 0) {
                throw new ConflictException('Booking conflict date.');
            }

            if(soLuongKhach > bookingExist.Phong.khach){
                throw new BadRequestException("Booking error: Number of guests exceeds the room's capacity.")
            }

            return new ResponseBody( HttpStatus.OK, await prisma.datPhong.update({
                where:{
                    id: bookingId,
                    ma_nguoi_dat: userId
                },
                data:{
                    ngay_den: new Date(ngayDen),
                    ngay_di: new Date(ngayDi),
                    so_luong_khach: soLuongKhach
                }
            }));
        } catch (err) {
            throw new HttpException(err.message, err.status);
        }
    }

    async delete(authUser: AuthUser, bookingId: number): Promise<any> {
        try {

            const userId = authUser.id;
            const holderBooking = await prisma.datPhong.findFirst({
                where:{
                    id: bookingId,
                    ma_nguoi_dat: userId
                }
            });

            if(!holderBooking){
                throw new UnauthorizedException();
            }

            await prisma.datPhong.delete({
                where:{
                    id: bookingId,
                    ma_nguoi_dat: userId
                }
            })

            return new ResponseBody( HttpStatus.OK, 'Success');
        } catch (err) {
            throw new HttpException(err.message, err.status);
        }
    }
}
