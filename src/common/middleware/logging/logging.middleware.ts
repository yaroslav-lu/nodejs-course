import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HttpRequest');

  use(req: Request, res: Response, next: NextFunction) {
    const { method, baseUrl, query, body } = req;
    this.logger.log(
      JSON.stringify({
        method: method,
        path: baseUrl,
        query: query,
        body: body,
      }),
    );
    next();
  }
}
