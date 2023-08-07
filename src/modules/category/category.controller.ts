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
    Req, 
    UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';

@Controller('api/category')
@ApiTags('LoaiPhong')
export class CategoryController {
    constructor( private readonly categoryService: CategoryService){}

    @Get()
    @HttpCode(HttpStatus.OK)
    getAll(): Promise<any> {
        return this.categoryService.getAll();
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get('/:maLoai')
    @HttpCode(HttpStatus.OK)
    getOne(@Param('maLoai') categoryId: string): Promise<any> {
        return this.categoryService.getOne(Number(categoryId));
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Patch('/:id')
    @HttpCode(HttpStatus.OK)
    @ApiBody({ type: CategoryDto })
    update(
        @Req() req,
        @Param('id') id: string,
        @Body() category: CategoryDto
    ): Promise<any> {
        return this.categoryService.update(req.user, Number(id), category);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiBody({ type: CategoryDto })
    create(
        @Req() req,
        @Body() category: CategoryDto
        ): Promise<any> {
        return this.categoryService.create(req.user, category);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Delete('/:id')
    @HttpCode(HttpStatus.OK)
    delete(
        @Req() req,
        @Param('id') id: string
        ): Promise<any> {
        return this.categoryService.delete(req.user, Number(id));
    }
}
