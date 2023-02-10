import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = new Logger('START');
  const port = configService.get('port');

  const configSW = new DocumentBuilder()
    .setTitle('')
    .setDescription('')
    .setVersion(process.env.npm_package_version || '0.1.0')
    .build();
  const document = SwaggerModule.createDocument(app, configSW);
  SwaggerModule.setup('api', app, document);

  await app.listen(port, () => {
    logger.debug(`---------- Server started on port ${port} ----------`);
  });
}
bootstrap();
