import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ServerErrorException } from 'src/errors';

@Catch(ServerErrorException)
export class ServerErrorFilter implements ExceptionFilter {
  catch(exception: ServerErrorException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const statusCode = 500;
    const message = exception.message;
    const timestamp = new Date().toISOString();

    response.status(statusCode).json({
      statusCode,
      message,
      timestamp,
    });
  }
}
