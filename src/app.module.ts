import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { RoomModule } from './modules/room/room.module';
import { LocationModule } from './modules/location/location.module';
import { ConfigModule } from '@nestjs/config';
import { CommentModule } from './modules/comment/comment.module';
import { BookingModule } from './modules/booking/booking.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        AuthModule,
        CommentModule,
        BookingModule,
        UsersModule, 
        RoomModule,
        LocationModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
