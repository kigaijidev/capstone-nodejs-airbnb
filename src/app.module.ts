import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { RoomModule } from './modules/room/room.module';
import { LocationModule } from './modules/location/location.module';

@Module({
  imports: [
    AuthModule, 
    UsersModule, 
    RoomModule,
    LocationModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
