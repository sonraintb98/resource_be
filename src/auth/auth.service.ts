import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { AuthRepository } from './auth.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LogoutUserDto } from './dto/logout-user.dto';
import { LoginUserDto } from 'src/auth/dto/login-user.dto';
import { format } from 'util';
import { EMAIL_ADDRESS_NAME, USER_NAME } from 'src/common';
import responseMessage from 'src/shared/utils/mocks/Message';
import { UserDto } from 'src/shared';
import { ConfigService } from '@nestjs/config';
import { TokensService } from 'src/tokens/tokens.service';
import { TokensRepository } from 'src/tokens/tokens.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
    private configService: ConfigService,
    private readonly tokensService: TokensService,
    private readonly tokensRepository: TokensRepository,
  ) {}

  // async signin(email: string, password: string) {
  //   const user = await this.authRepository.findByEmail(email);

  //   if (!user) {
  //     throw new NotFoundException('User not found. Please try again!');
  //   } else {
  //     const isMatch = await bcrypt.compare(password, user.password);
  //     if (!isMatch) {
  //       throw new NotFoundException('Password is wrong. Please try again!');
  //     }
  //     const payload = { email: user.email, role: user.role };
  //     // const { password, ...user } = isMatch;
  //     return {
  //       access_token: await this.jwtService.sign(payload),
  //     };
  //   }
  // }

  async validateEmail(email: string) {
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.match(mailformat)) {
      throw new BadRequestException(
        format(responseMessage.invalid_field, EMAIL_ADDRESS_NAME),
      );
    }
    return true;
  }

  async validateUser(email: string, password: string): Promise<any> {
    // await this.validateEmail(email);

    const user = await this.authRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException(format(responseMessage.notFound, USER_NAME));
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new BadRequestException(responseMessage.wrongUserPass);
      }
      return user;
    }
  }

  async signin(loginUserDto: LoginUserDto) {
    const user = await this.validateUser(
      loginUserDto.email,
      loginUserDto.password,
    );
    const token = await this.generateTokens(user);
    return {
      email: user.email,
      ...token,
    };
  }

  private async generateTokens(userDto: UserDto) {
    const accessToken = this.jwtService.sign(
      {
        id: userDto._id,
        email: userDto.email,
        role: userDto.role,
      },
      {
        secret: `${this.configService.get('JWT_SECRET')}`,
        expiresIn: `${this.configService.get('JWT_EXPIRATION_TIME')}`,
      },
    );

    const refreshToken = this.jwtService.sign(
      { id: userDto._id, email: userDto.email },
      {
        secret: `${this.configService.get('JWT_SECRET_REFRESH')}`,
        expiresIn: `${this.configService.get('JWT_EXPIRATION_TIME_REFRESH')}`,
      },
    );

    const idToken = this.jwtService.sign(
      {
        id: userDto._id,
        email: userDto.email,
        firstName: userDto.firstName,
        image: userDto.image,
        lastName: userDto.lastName,
        activated: userDto.activated,
        role: userDto.role,
      },
      {
        secret: `${this.configService.get('JWT_SECRET_ID_TOKEN')}`,
        expiresIn: `${this.configService.get('JWT_EXPIRATION_TIME_ID_TOKEN')}`,
      },
    );

    await this.createTokens(userDto.email, accessToken, refreshToken, idToken);
    return {
      accessToken,
      refreshToken,
      idToken,
    };
  }

  async createTokens(
    email: string,
    accessToken: string,
    refreshToken: string,
    idToken: string,
  ) {
    return await this.tokensService.createToken({
      email,
      accessToken,
      refreshToken,
      idToken,
    });
  }

  // async signout(logoutUserDto: LogoutUserDto) {
  //   const user = await this.authRepository.findByEmail(logoutUserDto.email);
  //   if (!user) {
  //     throw new NotFoundException('User not found. Please try again!');
  //   }

  //   // await this.tokensRepository.deleteByEmail(logoutUserDto.email);

  //   return user.email;
  // }

  async signout(logoutUserDto: LogoutUserDto) {
    const user = await this.authRepository.findByEmail(logoutUserDto.email);
    if (!user) {
      throw new NotFoundException('User not found. Please try again!');
    }

    await this.tokensRepository.deleteByEmail(logoutUserDto.email);

    return user.email;
  }
}
