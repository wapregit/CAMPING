import { NextFunction, Request, Response } from 'src/express';

export const errorHandler = (error: any, req: Request, res: Response, _next: NextFunction) => {
  const status = typeof error?.statusCode === 'number' ? error.statusCode : 500;
  const message = error.message || 'Something went wrong';

  res.status(status).json({
    success: false,
    message,
    code: error.code,
    details: error.details,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
  });
};
