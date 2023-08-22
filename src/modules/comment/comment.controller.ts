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
import { CommentService } from './comment.service';
import { UpdateCommentDto } from './dto/update-comment';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ApiTagsEnum } from 'src/enums/apitags.enum';

@Controller('api/binh-luan')
@ApiTags(ApiTagsEnum.COMMENT)
export class CommentController {
    constructor( private readonly commentService: CommentService){}

    @Get()
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    getAll(): Promise<any> {
        return this.commentService.getAll();
    }

    @Get('/lay-binh-luan-theo-phong/:maPhong')
    @HttpCode(HttpStatus.OK)
    getOne(@Param('maPhong') roomId: string): Promise<any> {
        return this.commentService.getByRoom(Number(roomId));
    }

    @Patch('/:id')
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiBody({ type: UpdateCommentDto })
    update(
        @Req() req,
        @Param('id') id: string,
        @Body() comment: UpdateCommentDto
    ): Promise<any> {
        return this.commentService.update(req.user, Number(id), comment);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiBody({ type: CreateCommentDto })
    create(
        @Req() req,
        @Body() comment: CreateCommentDto
        ): Promise<any> {
        return this.commentService.create(req.user, comment);
    }

    @Delete('/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @HttpCode(HttpStatus.OK)
    delete(
        @Req() req,
        @Param('id') id: string
        ): Promise<any> {
        return this.commentService.delete(req.user,Number(id));
    }

}
