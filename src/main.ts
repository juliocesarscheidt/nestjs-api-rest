import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NotFoundErrorFilter } from './not-found-error/not-found-error.filter';
import { ServerErrorFilter } from './server-error/server-error.filter';
import { UnprocessableEntityFilter } from './unprocessable-entity/unprocessable-entity.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // enable class validation globally
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  // enable global error filter
  app.useGlobalFilters(
    new NotFoundErrorFilter(),
    new ServerErrorFilter(),
    new UnprocessableEntityFilter(),
  );

  await app.listen(3000);
}
bootstrap();
