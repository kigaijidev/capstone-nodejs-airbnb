import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException, Res, UnauthorizedException } from '@nestjs/common';
import prisma from 'src/configs/prisma.config';
import { ResponseBody } from 'src/common/responseBody';
import { AuthUser } from 'src/common/auth/auth-user';

@Injectable()
export class PinService {

    async getByUser(authUser: AuthUser): Promise<any> {
        try {

            const userId = authUser.id;
            const holderPins = await prisma.ghimPhong.findMany({
                where:{
                    ma_nguoi_dung: userId
                },
                include:{
                    Phong:{
                        select:{
                            ten_phong: true,
                            ma_vi_tri: true,
                            loai_phong: true,
                            hinh_anh: true,
                        }
                    }
                }
            });

            return new ResponseBody( HttpStatus.OK, holderPins);
        } catch (err) {
            throw new HttpException(err.message, err.status);
        }
    }

    async pin(authUser: AuthUser, roomId: number): Promise<any> {
        try {

            const userId = authUser.id;
            const roomExist = await prisma.phong.findFirst({
                where:{
                    id: roomId
                }
            })

            if(!roomExist){
                throw new NotFoundException()
            }

            const pinExist = await prisma.ghimPhong.findFirst({
                where: {
                    ma_nguoi_dung: userId,
                    ma_phong: roomId,
                }
            })

            if(pinExist){
                return new ResponseBody( HttpStatus.OK, "Pin existed.");
            }

            const holderPin = await prisma.ghimPhong.create({
                data:{
                    ma_nguoi_dung: userId,
                    ma_phong: roomExist.id,
                    created_at: new Date()
                }
            });

            return new ResponseBody( HttpStatus.CREATED, holderPin);
        } catch (err) {
            throw new HttpException(err.message, err.status);
        }
    }

    async unPin(authUser: AuthUser, roomId: number): Promise<any> {
        try {

            const userId = authUser.id;
            const pinExist = await prisma.ghimPhong.findFirst({
                where: {
                    ma_nguoi_dung: userId,
                    ma_phong: roomId,
                }
            })

            if(!pinExist){
                throw new NotFoundException()
            }

            const holderPin = await prisma.ghimPhong.delete({
                where:{
                    ma_nguoi_dung_ma_phong:{
                        ma_nguoi_dung: userId,
                        ma_phong: pinExist.ma_phong
                    }
                }
            });

            return new ResponseBody( HttpStatus.OK, 'Success');
        } catch (err) {
            throw new HttpException(err.message, err.status);
        }
    }

}
