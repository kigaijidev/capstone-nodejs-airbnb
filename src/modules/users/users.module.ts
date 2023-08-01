import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthUtil } from 'src/utils/auth.util';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    AuthUtil
  ]
})
export class UsersModule {}
