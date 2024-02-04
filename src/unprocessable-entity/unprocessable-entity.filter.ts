import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { UnprocessableEntityException } from 'src/errors';

@Catch(UnprocessableEntityException)
export class UnprocessableEntityFilter implements ExceptionFilter {
  catch(exception: UnprocessableEntityException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const statusCode = 422;
    const message = exception.message;
    const timestamp = new Date().toISOString();

    response.status(statusCode).json({
      statusCode,
      message,
      timestamp,
    });
  }
}
