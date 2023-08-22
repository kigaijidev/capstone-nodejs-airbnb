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
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { UploadImageDto } from 'src/common/dto/upload-image.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import slugify from 'slugify';
import { PageDto } from 'src/common/dto/page.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { signUpDto } from '../auth/dto/signUp.dto';
import { ApiTagsEnum } from 'src/enums/apitags.enum';

@Controller('api/users')
@ApiTags(ApiTagsEnum.USERS)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UsersController {

    constructor(private readonly usersService: UsersService){}

    @Get()
    @HttpCode(HttpStatus.OK)
    getAll(): Promise<any> {
        return this.usersService.getAll();
    }

    @Get('/deleted')
    @HttpCode(HttpStatus.OK)
    getAllDeleted(): Promise<any> {
        return this.usersService.getAllDeleted();
    }

    @Get('/phan-trang-tim-kiem')
    @HttpCode(HttpStatus.OK)
    getWithPagination(@Query() query: PageDto): Promise<any> {
        return this.usersService.getWithPagination(query);
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    getOne(@Param('id') id: string): Promise<any> {
        return this.usersService.getOne(Number(id));
    }

    @Get('/search/:tenNguoiDung')
    @HttpCode(HttpStatus.OK)
    getSearch(@Param('tenNguoiDung') name: string): Promise<any> {
        return this.usersService.getSearch(name);
    }

    @Patch('/:id')
    @HttpCode(HttpStatus.OK)
    @ApiBody({ type: UpdateUserDto })
    update(
        @Param('id') id: string,
        @Body() user: UpdateUserDto
    ): Promise<any> {
        return this.usersService.update(Number(id), user);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiBody({ type: signUpDto })
    create(@Body() user: signUpDto): Promise<any> {
        return this.usersService.create(user);
    }

    @Patch('/block/:id')
    @HttpCode(HttpStatus.OK)
    setDeleted(@Param('id') id: string): Promise<any> {
        return this.usersService.setDeleted(Number(id));
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.OK)
    delete(@Param('id') id: string): Promise<any> {
        return this.usersService.delete(Number(id));
    }

    @HttpCode(HttpStatus.OK)
    @Post('upload-hinh-avatar/:id')
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
        return this.usersService.uploadImage(Number(id), file);
    }
}
