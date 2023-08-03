import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put, Req } from '@nestjs/common';
import { ApiTags, ApiBody, ApiParam } from '@nestjs/swagger';
import { CreateLocationDto } from './dto/create-location.dto';
import { LocationService } from './location.service';
import { UpdateLocationDto } from './dto/update-location';

@Controller('api/vi-tri')
@ApiTags('ViTri')
export class LocationController {
    constructor( private readonly locationService: LocationService){}

    @Get()
    @HttpCode(HttpStatus.OK)
    getAll(): Promise<any> {
        return this.locationService.getAll();
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiBody({ type: CreateLocationDto })
    create(@Body() location: CreateLocationDto): Promise<any> {
        return this.locationService.create(location);
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    getOne(@Param('id') id: string): Promise<any> {
        return this.locationService.getOne(Number(id));
    }

    @Put('/:id')
    @HttpCode(HttpStatus.OK)
    @ApiBody({ type: UpdateLocationDto })
    update(
        @Param('id') id: string,
        @Body() location: UpdateLocationDto
    ): Promise<any> {
        return this.locationService.update(Number(id), location);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.OK)
    delete(@Param('id') id: string): Promise<any> {
        return this.locationService.delete(Number(id));
    }
}
