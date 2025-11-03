import { AppError } from './AppError';

const renderError = (message: string, statusCode: number) => {
  throw new AppError(message, statusCode);
};

export default renderError;
