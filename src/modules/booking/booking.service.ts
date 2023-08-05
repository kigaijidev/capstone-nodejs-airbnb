import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException, Res, UnauthorizedException } from '@nestjs/common';
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

            const roomExist = await prisma.phong.findFirst({
                where:{
                    id: maPhong
                }
            })
            if(!roomExist){
                throw new NotFoundException('Room not exist')
            }
            const holderBooking = await prisma.datPhong.create({
                data:{
                    ma_phong: maPhong,
                    ma_nguoi_dat: userId,
                    ngay_den: ngayDen,
                    ngay_di: ngayDi,
                    so_luong_khach: soLuongKhach,
                    created_at: new Date()
                }
            });

            return new ResponseBody( HttpStatus.CREATED, holderBooking);
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
            
            const bookingExist = await prisma.datPhong.findFirst({
                where:{
                    id: bookingId,
                    ma_nguoi_dat: userId
                }
            })

            if(!bookingExist){
                throw new UnauthorizedException();
            }

            const holderBooking = await prisma.datPhong.update({
                where:{
                    id: bookingId,
                    ma_nguoi_dat: userId
                },
                data:{
                    ngay_den: ngayDen,
                    ngay_di: ngayDi
                }
            });

            return new ResponseBody( HttpStatus.OK, holderBooking);
        } catch (err) {
            throw new HttpException(err.message, err.status);
        }
    }

    async delete(authUser: AuthUser, commentId: number): Promise<any> {
        try {

            const userId = authUser.id;
            const holderComment = await prisma.binhLuan.findFirst({
                where:{
                    id: commentId,
                    ma_nguoi_binh_luan: userId
                }
            });

            if(!holderComment){
                throw new UnauthorizedException();
            }

            await prisma.binhLuan.delete({
                where:{
                    id: commentId,
                    ma_nguoi_binh_luan: userId
                }
            })

            return new ResponseBody( HttpStatus.OK, 'Success');
        } catch (err) {
            throw new HttpException(err.message, err.status);
        }
    }
}
