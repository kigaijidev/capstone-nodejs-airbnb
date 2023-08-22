import { 
    Controller, 
    Delete,
    HttpCode, 
    HttpStatus, 
    Param,
    Get, 
    Post, 
    Req, 
    UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { PinService } from './pin.service';
import { ApiTagsEnum } from 'src/enums/apitags.enum';

@Controller('api/pin')
@ApiTags(ApiTagsEnum.PIN)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class PinController {
    constructor(private readonly pinService: PinService){}

    @Get()
    @HttpCode(HttpStatus.OK)
    getByUser(
        @Req() req
        ): Promise<any> {
        return this.pinService.getByUser(req.user);
    }

    @Post('/:maPhong')
    @HttpCode(HttpStatus.CREATED)
    pin(
        @Req() req,
        @Param('maPhong') roomId: string
        ): Promise<any> {
        return this.pinService.pin(req.user, Number(roomId));
    }

    @Delete('/:maPhong')
    @HttpCode(HttpStatus.OK)
    unPin(
        @Req() req,
        @Param('maPhong') roomId: string
        ): Promise<any> {
        return this.pinService.unPin(req.user, Number(roomId));
    }

}
