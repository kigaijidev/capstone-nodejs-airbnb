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
import { BookingService } from './booking.service';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { BookingDto } from './dto/booking.dto';

@Controller('api/dat-phong')
@ApiTags('DatPhong')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class BookingController {

    constructor( private readonly bookingService: BookingService){}

    @Get()
    @HttpCode(HttpStatus.OK)
    getAll(): Promise<any> {
        return this.bookingService.getAll();
    }

    @Get('/lay-theo-nguoi-dung')
    @HttpCode(HttpStatus.OK)
    getByUser(@Req() req): Promise<any> {
        return this.bookingService.getByUser(req.user);
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    getOne( @Param('id') id: string,): Promise<any> {
        return this.bookingService.getOne(Number(id));
    }

    @Patch('/:id')
    @HttpCode(HttpStatus.OK)
    @ApiBody({ type: UpdateBookingDto })
    update(
        @Req() req,
        @Param('id') id: string,
        @Body() booking: UpdateBookingDto
    ): Promise<any> {
        return this.bookingService.update(req.user, Number(id), booking);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiBody({ type: BookingDto })
    create(
        @Req() req,
        @Body() booking: BookingDto
        ): Promise<any> {
        return this.bookingService.create(req.user, booking);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.OK)
    delete(
        @Req() req,
        @Param('id') id: string
        ): Promise<any> {
        return this.bookingService.delete(req.user, Number(id));
    }
}
