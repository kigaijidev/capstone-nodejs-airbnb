import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException, Res, UnauthorizedException } from '@nestjs/common';
import prisma from 'src/configs/prisma.config';
import { ResponseBody } from 'src/common/responseBody';
import { AuthUser } from 'src/common/auth/auth-user';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment';

@Injectable()
export class CommentService {
    
    async create(authUser: AuthUser, comment: CreateCommentDto): Promise<any> {
        try {
            const { maPhong, noiDung, saoBinhLuan } = comment;
            const userId = authUser.id;
            if(!maPhong || !noiDung || !saoBinhLuan){
                throw new BadRequestException('Missing data required');
            }

            const roomExist = await prisma.phong.findFirst({
                where:{
                    id: maPhong
                }
            })
            if(!roomExist){
                throw new NotFoundException('Room not exist')
            }
            const holderComment = await prisma.binhLuan.create({
                data:{
                    ma_phong: maPhong,
                    ma_nguoi_binh_luan: userId,
                    noi_dung: noiDung,
                    sao_binh_luan: saoBinhLuan,
                    ngay_binh_luan: new Date(),
                    created_at: new Date(),
                }
            });

            return new ResponseBody( HttpStatus.CREATED, holderComment);
        } catch (err) {
            throw new HttpException(err.message, err.status);
        }
    }

    async getByRoom(roomId: number): Promise<any> {
        try {
            const roomExist = await prisma.phong.findFirst({
                where:{
                    id: roomId
                }
            })

            if(!roomExist){
                throw new NotFoundException('Room not exist.')
            }

            const holderComment = await prisma.binhLuan.findMany({
                where:{
                    ma_phong: roomId
                },
                include:{
                    NguoiDung:{
                        select:{
                            name: true,
                            email: true,
                        }
                    }
                }
            });

            return new ResponseBody( HttpStatus.OK, holderComment);
        } catch (err) {
            throw new HttpException(err.message, err.status);
        }
    }

    async getAll(): Promise<any> {
        try {
            const comments = await prisma.binhLuan.findMany({
                include:{
                    NguoiDung:{
                        select:{
                            name: true,
                            email: true,
                        }
                    }
                }
            });
            return new ResponseBody( HttpStatus.OK, comments)
        } catch (err) {
            throw new HttpException(err.message, err.status);
        }
    }

    async update(authUser: AuthUser, commentId: number, comment: UpdateCommentDto): Promise<any> {
        try {
            const { noiDung, saoBinhLuan } = comment;
            const userId = authUser.id;
            
            if(!noiDung || !saoBinhLuan ){
                throw new BadRequestException('Missing data required');
            }

            const commentExist = await prisma.binhLuan.findFirst({
                where:{
                    id: commentId,
                    ma_nguoi_binh_luan: userId
                }
            })

            if(!commentExist){
                throw new UnauthorizedException();
            }

            const holderComment = await prisma.binhLuan.update({
                where:{
                    id: commentId,
                    ma_nguoi_binh_luan: userId
                },
                data:{
                    noi_dung: noiDung,
                    sao_binh_luan: saoBinhLuan
                }
            });

            return new ResponseBody( HttpStatus.OK, holderComment);
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
