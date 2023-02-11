import { INestApplication, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = new Logger('START');
  const port = configService.get('port');

  openAPI(app);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  await app.listen(port, () => {
    logger.debug(`---------- Server started on port ${port} ----------`);
  });
}
async function openAPI(app: INestApplication) {
  const configSW = new DocumentBuilder()
    .setTitle('')
    .setDescription('')
    .setVersion(process.env.npm_package_version || '0.1.0')
    .build();
  const document = SwaggerModule.createDocument(app, configSW);
  SwaggerModule.setup('api', app, document);
}
bootstrap();
