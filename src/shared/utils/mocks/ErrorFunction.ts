import { BadRequestException } from '@nestjs/common';

const mockedErrorFunction = {
  validatePassword: () => {
    throw new BadRequestException(
      'Minimum 8 characters, maximum 32 characters, at least one uppercase, one lowercase, one number and one special character!',
    );
  },
};

export default mockedErrorFunction;
