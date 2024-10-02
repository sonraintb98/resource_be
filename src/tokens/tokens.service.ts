import { Injectable } from '@nestjs/common';
import { EMAIL_NAME } from 'src/common';
import responseMessage from 'src/common/messages';
import {
  failureResponseWithoutPagination,
  successResponseWithoutPagination,
} from 'src/shared';
import { format } from 'util';
import { UsersRepository } from 'src/users/users.repository';
import { TokensRepository } from './tokens.repository';
import { CreateTokenDto } from './dto/create-token.dto';
import { RevokeTokenDto } from './dto/revoke-token.dto';

@Injectable()
export class TokensService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly tokensRepository: TokensRepository,
  ) {}

  async createToken(createTokenDto: CreateTokenDto) {
    let res = successResponseWithoutPagination();

    try {
      // the email existed/not
      const existedUser = await this.usersRepository.findOneByEmail(
        createTokenDto.email,
      );

      if (!existedUser) {
        throw new Error(format(responseMessage.notFound, EMAIL_NAME));
      }

      await this.tokensRepository.deleteByEmail(createTokenDto.email);

      res.data = await this.tokensRepository.create(createTokenDto);
    } catch (error) {
      const errMsg = error.message || responseMessage.unknownException;
      res = failureResponseWithoutPagination(null, errMsg);
    }

    return res;
  }

  async exchangeToken(exchangeTokenDto: CreateTokenDto) {
    let res = successResponseWithoutPagination();

    try {
      // the email existed/not
      const existedUser = await this.usersRepository.findOneByEmail(
        exchangeTokenDto.email,
      );

      if (!existedUser) {
        throw new Error(format(responseMessage.notFound, EMAIL_NAME));
      }

      const updateToken = await this.tokensRepository.findOneAndUpdate(
        {
          email: exchangeTokenDto.email,
        },
        exchangeTokenDto,
      );

      if (!updateToken) {
        throw new Error(responseMessage.invalidToken);
      }

      res.data = exchangeTokenDto;
    } catch (error) {
      const errMsg = error.message || responseMessage.unknownException;
      res = failureResponseWithoutPagination(null, errMsg);
    }

    return res;
  }

  async revokeToken(revokeTokenDto: RevokeTokenDto) {
    let res = successResponseWithoutPagination();

    try {
      if (
        revokeTokenDto.hasOwnProperty('refreshToken') ||
        revokeTokenDto.refreshToken !== ''
      ) {
        await this.tokensRepository.deleteByEmailAndRefreshToken(
          revokeTokenDto.email,
          revokeTokenDto.refreshToken,
        );
      } else if (
        revokeTokenDto.hasOwnProperty('idToken') ||
        revokeTokenDto.idToken !== ''
      ) {
        await this.tokensRepository.deleteByEmailAndIdToken(
          revokeTokenDto.email,
          revokeTokenDto.idToken,
        );
      } else {
        throw new Error(responseMessage.cannotRevokeToken);
      }

      res.data = revokeTokenDto.email;
    } catch (error) {
      const errMsg = error.message || responseMessage.unknownException;
      res = failureResponseWithoutPagination(null, errMsg);
    }

    return res;
  }
}
