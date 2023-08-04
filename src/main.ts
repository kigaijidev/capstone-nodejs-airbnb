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
	app.use(helmet());
	app.use(morgan('combined'));
	app.use(cookieParser());

    const config = new DocumentBuilder()
		.setTitle('Airbnb')
		.addBearerAuth()
		.setVersion('1.0')
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('swagger', app, document);

    await app.listen(APP_PORT, () => {
		console.log(`Server starting with port :: ${APP_PORT}.`)
	});
}
bootstrap();
