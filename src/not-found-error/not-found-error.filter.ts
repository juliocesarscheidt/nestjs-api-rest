import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { NotFoundException } from 'src/errors';

@Catch(NotFoundException)
export class NotFoundErrorFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const statusCode = 404;
    const message = exception.message;
    const timestamp = new Date().toISOString();

    response.status(statusCode).json({
      statusCode,
      message,
      timestamp,
    });
  }
}
