import { 
    Body, 
    Controller, 
    Delete, 
    Get, 
    HttpCode, 
    HttpStatus, 
    Param, 
    Patch, 
    Post, 
    Query, 
    Req, 
    UploadedFile, 
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import { ApiTags, ApiBody, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { UploadImageDto } from 'src/common/dto/upload-image.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import slugify from 'slugify';
import { PageDto } from 'src/common/dto/page.dto';
import { RoomService } from './room.service';
import { RoomDto } from './dto/room.dto';

@Controller('api/phong-thue')
@ApiTags('Phong')
export class RoomController {
    constructor(private readonly roomService: RoomService){}

    @Get()
    @HttpCode(HttpStatus.OK)
    getAll(): Promise<any> {
        return this.roomService.getAll();
    }

    @Get('/phan-trang-tim-kiem')
    @HttpCode(HttpStatus.OK)
    getWithPagination(@Query() query: PageDto): Promise<any> {
        return this.roomService.getWithPagination(query);
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    getOne(@Param('id') id: string): Promise<any> {
        return this.roomService.getOne(Number(id));
    }

    @Get('/lay-phong-theo-vi-tri/:maViTri')
    @HttpCode(HttpStatus.OK)
    getSearch(@Param('maViTri') locationId: string): Promise<any> {
        return this.roomService.getByLocation(Number(locationId));
    }

    @Get('/category/:maLoai')
    @HttpCode(HttpStatus.OK)
    getByCategory(@Param('maLoai') categoryId: string): Promise<any> {
        return this.roomService.getByCategory(Number(categoryId));
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Patch('/:id')
    @HttpCode(HttpStatus.OK)
    @ApiBody({ type: RoomDto })
    update(
        @Req() req,
        @Param('id') id: string,
        @Body() room: RoomDto
    ): Promise<any> {
        return this.roomService.update(req.user, Number(id), room);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiBody({ type: RoomDto })
    create(
        @Req() req,
        @Body() room: RoomDto
        ): Promise<any> {
        return this.roomService.create(req.user, room);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Delete('/:id')
    @HttpCode(HttpStatus.OK)
    delete(
        @Req() req,
        @Param('id') id: string
        ): Promise<any> {
        return this.roomService.delete(req.user, Number(id));
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @HttpCode(HttpStatus.OK)
    @Post('upload-hinh-phong/:id')
    @ApiBody({ type: UploadImageDto})
    @ApiConsumes("multipart/form-data")
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: process.cwd() +'/public/images',
                filename: (req, file, callback) => {
                    callback(null, Date.now() + slugify(file.originalname));
                },
            }),
        }),
    )
    uploadImage(
        @Req() req,
        @Param('id') id: string,
        @UploadedFile() file
    ): Promise<any> {
        return this.roomService.uploadImage(req.user, Number(id), file);
    }
}
