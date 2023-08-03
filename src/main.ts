import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import helmet from 'helmet';
import * as morgan from 'morgan';
import * as express from 'express';
import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

async function bootstrap() {
	dotenv.config();
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        logger: ['error', 'warn'],
    });

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

    await app.listen(3000);
}
bootstrap();
