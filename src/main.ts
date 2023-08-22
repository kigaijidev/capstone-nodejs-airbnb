require('dotenv').config();
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import helmet from 'helmet';
import * as morgan from 'morgan';
import * as express from 'express';
import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ApiTagsEnum } from './enums/apitags.enum';
import { AuthModule } from './modules/auth/auth.module';
import { CommentModule } from './modules/comment/comment.module';
import { BookingModule } from './modules/booking/booking.module';
import { PinModule } from './modules/pin/pin.module';
import { UsersModule } from './modules/users/users.module';
import { RoomModule } from './modules/room/room.module';
import { CategoryModule } from './modules/category/category.module';
import { LocationModule } from './modules/location/location.module';

async function bootstrap() {
	dotenv.config();
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        logger: ['error', 'warn'],
    });
	const configService = app.get(ConfigService);
	const APP_PORT = configService.get<number>('APP_PORT') || 3000;

    app.useGlobalPipes(new ValidationPipe());

    // Enable middleware
    app.enableCors();
	app.use(express.static('.'));
	app.use(compression());
	app.use(morgan('combined'));
	app.use(cookieParser());
	app.use(helmet());

	const { HOME, ...NameTags} = ApiTagsEnum;
	const visibleTags = Object.values(NameTags);

    const config = new DocumentBuilder()
		.setTitle('Airbnb')
		.addBearerAuth()
		.setVersion('1.0')
		.setExternalDoc('Postman Collection', '/docs-json');

	for (const tag of visibleTags) {
		config.addTag(tag);
	}

	const document = SwaggerModule.createDocument(app, config.build(),{
		include: [
			AuthModule,
			CommentModule,
			BookingModule,
			PinModule,
			UsersModule, 
			RoomModule,
			LocationModule,
			CategoryModule,
		],
	});

	SwaggerModule.setup('docs', app, document, {
		customCssUrl:'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.4.2/swagger-ui.css',
		customJs: [
			'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.4.2/swagger-ui.js',
			'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.4.2/swagger-ui-standalone-preset.js',
		],
	});

    await app.listen(APP_PORT, () => {
		console.log(`Server starting with port :: ${APP_PORT}.`)
	});
}
bootstrap();
