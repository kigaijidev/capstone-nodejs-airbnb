import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { UsersService } from '../users/users.service';
import { signUpDto } from './dto/signUp.dto';
import { signInDto } from './dto/signIn.dto';

@Controller('api/auth')
@ApiTags('Auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService
    ) {}

    @Post('signup')
    @HttpCode(HttpStatus.CREATED)
    @ApiBody({ type: signUpDto })
    signUp(@Body() signUp: signUpDto): Promise<any> {
        return this.usersService.create(signUp);
    }

    @Post('signin')
    @HttpCode(HttpStatus.OK)
    @ApiBody({ type: signInDto })
    signIn(@Body() signIn: signInDto): Promise<any> {
        return this.authService.signIn(signIn);
    }
}
