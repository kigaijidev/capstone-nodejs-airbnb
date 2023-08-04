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
    Put, 
    Query, 
    Req, 
    UploadedFile, 
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import { ApiTags, ApiBody, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { CreateLocationDto } from './dto/create-location.dto';
import { LocationService } from './location.service';
import { UpdateLocationDto } from './dto/update-location';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { UploadImageDto } from 'src/common/dto/upload-image.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import slugify from 'slugify';
import { PageDto } from 'src/common/dto/page.dto';

@Controller('api/vi-tri')
@ApiTags('ViTri')
export class LocationController {
    constructor( private readonly locationService: LocationService){}

    @Get()
    @HttpCode(HttpStatus.OK)
    getAll(): Promise<any> {
        return this.locationService.getAll();
    }

    @Get('/phan-trang-tim-kiem')
    @HttpCode(HttpStatus.OK)
    getWithPagination(@Query() query: PageDto): Promise<any> {
        return this.locationService.getWithPagination(query);
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    getOne(@Param('id') id: string): Promise<any> {
        return this.locationService.getOne(Number(id));
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Patch('/:id')
    @HttpCode(HttpStatus.OK)
    @ApiBody({ type: UpdateLocationDto })
    update(
        @Param('id') id: string,
        @Body() location: UpdateLocationDto
    ): Promise<any> {
        return this.locationService.update(Number(id), location);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiBody({ type: CreateLocationDto })
    create(@Body() location: CreateLocationDto): Promise<any> {
        return this.locationService.create(location);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Delete('/:id')
    @HttpCode(HttpStatus.OK)
    delete(@Param('id') id: string): Promise<any> {
        return this.locationService.delete(Number(id));
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @HttpCode(HttpStatus.OK)
    @Post('upload-hinh-vitri/:id')
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
        @Param('id') id: string,
        @UploadedFile() file
    ): Promise<any> {
        return this.locationService.uploadImage(Number(id), file);
    }
}
