import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HttpDebugger');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const startTime = Date.now();
    const className = context.getClass().name;
    const methodName = context.getHandler().name;

    return next.handle().pipe(
      tap(() => {
        const executionTime = Date.now() - startTime;
        this.logger.log(`${className}.${methodName}() - ${executionTime}ms`);
      }),
      catchError((error) => {
        this.logger.log(`${className}.${methodName}() - ${error.message}`);
        return throwError(() => error);
      }),
    );
  }
}
