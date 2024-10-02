import { HttpException, HttpStatus } from '@nestjs/common';

export function handleException(error: any) {
  let message = '';
  try {
    message = error.response.message;
    if (message == undefined || message == null) {
      message = error.response.data.message;
    }
  } catch (errResponse) {
    try {
      message = error.response.data.message;
    } catch (errResponseData) {
      message = error;
    }
  }
  throw new HttpException(message, HttpStatus.BAD_REQUEST);
}
