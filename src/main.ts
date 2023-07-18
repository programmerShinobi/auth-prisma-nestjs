import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import  helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import { clientUrl } from './utils/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: { origin: clientUrl, credentials: true },
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.use(helmet());

  app.use(cookieParser());

  app.enableVersioning({
    type: VersioningType.URI
  })

  await app.listen(3000);
}
bootstrap();
